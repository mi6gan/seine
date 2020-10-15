// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import { useBlocksDispatch, useBlocksSelector } from './blocks';
import { useSelectedLayoutIds } from './layouts';
import { ClipboardContext } from './clipboard';
import { CreateLayoutButton, DeleteBlockButton, ToolbarMenu } from './ui';

import { Box, MenuItem } from '@seine/styles/mui-core.macro';
import type { Block } from '@seine/core';
import {
  blockTypes,
  cloneBlock,
  CREATE_BLOCK,
  createBlocksAction,
  DELETE_SELECTED_BLOCKS,
} from '@seine/core';

const MenuButton = styled(Box).attrs(({ disabled }) => ({
  component: MenuItem,
  color: disabled ? 'grey.500' : 'inherit',
  width: 1,
}))``;

type ItemMenuType = {
  isOpen: boolean,
  close: () => void,
  open: (anchorEl: HTMLElement) => void,
  anchorEl: HTMLElement | null,
};

const defaultItemMenu: ItemMenuType = {
  isOpen: false,
  close: () => void 0,
  open: () => void 0,
  anchorEl: null,
};
export const ItemMenuContext = React.createContext<ItemMenuType>(
  defaultItemMenu
);

// eslint-disable-next-line
export function ItemMenuProvider({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const close = useAutoCallback(() => {
    setAnchorEl(null);
  });
  const isOpen = anchorEl !== null;

  return (
    <ItemMenuContext.Provider
      value={useAutoMemo({
        isOpen,
        open: setAnchorEl,
        close,
        anchorEl,
      })}
    >
      {children}
    </ItemMenuContext.Provider>
  );
}

// eslint-disable-next-line
function useCopyCallback() {
  const clipboard = React.useContext(ClipboardContext);
  const blocks: [Block] = useBlocksSelector();

  return useAutoCallback(() => {
    const clones = [];
    for (const block of blocks) {
      const clone = cloneBlock(block);
      const parent =
        clones[blocks.findIndex(({ id }) => id === block['parent_id'])] || null;
      clone['parent_id'] = parent && parent.id;

      clones.push(clone);
      clipboard.push(createBlocksAction(CREATE_BLOCK, clone));
    }
  });
}

// eslint-disable-next-line
function useCutCallback() {
  const copy = useCopyCallback();
  const dispatch = useBlocksDispatch();

  return useAutoCallback(() => {
    dispatch({ type: DELETE_SELECTED_BLOCKS });
    copy();
  });
}

// eslint-disable-next-line
function usePasteCallback() {
  const clipboard = React.useContext(ClipboardContext);
  const { type = null, block = null } =
    clipboard.type === CREATE_BLOCK && clipboard.toJSON();
  const [parentId = null] = useSelectedLayoutIds();
  const dispatch = useBlocksDispatch();

  const isActiveRef = React.useRef(false);
  const { current: isActive } = isActiveRef;

  useAutoEffect(() => {
    if (type === null) {
      isActiveRef.current = false;
    } else if (isActive && block) {
      clipboard.pop();
      dispatch(createBlocksAction(type, block, block['parent_id'] || parentId));
    }
  });

  return useAutoCallback(() => {
    isActiveRef.current = true;
    clipboard.replace(clipboard.toJSON());
  });
}

/**
 * @description Selected item context menu.
 * @returns {React.Node}
 */
export default function EditorItemMenu() {
  const {
    pop: clipboardPop,
    push: clipboardPush,
    replace: clipboardReplace,
    ...clipboard
  } = React.useContext(ClipboardContext);
  const selectionBlocks: [Block] = useBlocksSelector(
    useAutoCallback(({ blocks, selection }) =>
      blocks.filter(({ id }) => selection.includes(id))
    )
  );
  const { isOpen, close, anchorEl } = React.useContext(ItemMenuContext);

  const isContainer = selectionBlocks.some(
    (block) =>
      block.type === blockTypes.LAYOUT || block.type === blockTypes.PAGE
  );

  return (
    <ToolbarMenu
      onClose={close}
      open={isOpen}
      anchorEl={anchorEl}
      keepMounted
      autoFocus
      mt={3}
      onClick={close}
    >
      <CreateLayoutButton
        as={MenuButton}
        disabled={
          selectionBlocks.length < 2 ||
          selectionBlocks.some(
            (nextBlock) =>
              nextBlock['parent_id'] !== selectionBlocks[0]['parent_id']
          )
        }
        onClick={close}
        {...(isContainer && { display: 'none' })}
      >
        Create layout
      </CreateLayoutButton>

      <MenuButton
        disabled={selectionBlocks.length === 0}
        onClick={useCopyCallback()}
      >
        Copy
      </MenuButton>

      <MenuButton
        disabled={selectionBlocks.length === 0}
        onClick={useCutCallback()}
      >
        Cut
      </MenuButton>

      <MenuButton
        disabled={!isContainer || clipboard.type !== CREATE_BLOCK}
        onClick={usePasteCallback()}
      >
        Paste
      </MenuButton>

      <DeleteBlockButton as={MenuItem} onClick={close}>
        Delete
      </DeleteBlockButton>
    </ToolbarMenu>
  );
}

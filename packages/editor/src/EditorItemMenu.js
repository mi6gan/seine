// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import { Box, MenuItem } from '../mui-core.macro';

import {
  ClipboardContext,
  useBlocksDispatch,
  useBlocksSelector,
} from './contexts';
import { selectionSelector } from './selectors';
import { ToolbarMenu, CreateLayoutButton, DeleteBlockButton } from './ui';

import type { Block } from '@seine/core';
import {
  blockTypes,
  CREATE_BLOCK,
  createBlock,
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

/**
 * @description Selected item context menu.
 * @returns {React.Node}
 */
export default function EditorItemMenu() {
  const dispatch = useBlocksDispatch();
  const selected = useBlocksSelector(selectionSelector);
  const [block = null, ...nextBlocks]: [Block] = useBlocksSelector(
    useAutoCallback(({ blocks, selection }) =>
      blocks.filter(({ id }) => selection.includes(id))
    )
  );
  const { isOpen, close, anchorEl } = React.useContext(ItemMenuContext);
  const clipboard = React.useContext(ClipboardContext);

  const isContainer =
    block &&
    nextBlocks.length === 0 &&
    (block.type === blockTypes.LAYOUT || block.type === blockTypes.PAGE);

  return (
    <ToolbarMenu
      onClose={close}
      open={isOpen}
      anchorEl={anchorEl}
      keepMounted
      autoFocus
      mt={3}
    >
      <CreateLayoutButton
        onClick={close}
        as={MenuButton}
        disabled={isContainer}
        {...(isContainer && { display: 'none' })}
      >
        Create layout
      </CreateLayoutButton>

      <MenuButton
        disabled={selected.length !== 1 || isContainer}
        onClick={useAutoCallback(() => {
          clipboard.replace({
            type: CREATE_BLOCK,
            block,
          });
          close();
        })}
        {...(isContainer && { display: 'none' })}
      >
        Copy
      </MenuButton>

      <MenuButton
        disabled={isContainer}
        onClick={useAutoCallback(() => {
          dispatch({ type: DELETE_SELECTED_BLOCKS });
          clipboard.replace({
            type: CREATE_BLOCK,
            block,
          });
          close();
        })}
        {...(isContainer && { display: 'none' })}
      >
        Cut
      </MenuButton>

      <MenuButton
        disabled={
          selected.length !== 1 ||
          !isContainer ||
          clipboard.type !== CREATE_BLOCK
        }
        onClick={useAutoCallback(() => {
          dispatch({
            type: CREATE_BLOCK,
            block: createBlock(
              clipboard.block.type,
              clipboard.block.body,
              clipboard.block.format
            ),
            id: block.id,
          });
          close();
        })}
        {...(!isContainer && { display: 'none' })}
      >
        Paste
      </MenuButton>

      <DeleteBlockButton as={MenuItem} onClick={close}>
        Delete
      </DeleteBlockButton>
    </ToolbarMenu>
  );
}

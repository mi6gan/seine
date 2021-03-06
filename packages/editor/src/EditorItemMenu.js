// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

import { MenuContext } from './MenuProvider';
import { MenuButton } from './ui';
import ContextMenu from './ContextMenu';
import { useBlocksDispatch, useEditorSelector } from './blocks';
import {
  CreateLayoutButton,
  DeleteBlockButton,
  useSelectedLayoutIds,
} from './layouts';
import { ClipboardContext } from './clipboard';

import type { Block } from '@seine/core';
import {
  blockTypes,
  cloneBlock,
  CREATE_BLOCK,
  createBlocksAction,
  DELETE_SELECTED_BLOCKS,
  isBlockLayout,
} from '@seine/core';

// eslint-disable-next-line
function useCopyCallback() {
  const clipboard = React.useContext(ClipboardContext);
  const blocks: [Block] = useEditorSelector();

  return useAutoCallback(() => {
    const clones = [];
    for (const block of blocks) {
      const clone = cloneBlock(block);
      const parent =
        clones[blocks.findIndex(({ id }) => id === block['parent_id'])] || null;
      clone['parent_id'] = parent && parent.id;

      clones.push(clone);
    }
    for (const clone of clones.reverse()) {
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

type Props = {
  menuButtonAs?: React.ComponentType,
};

/**
 * @description Default context menu.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditorItemMenu({
  menuButtonAs: ItemMenuButton = MenuButton,
}: Props) {
  const {
    pop: clipboardPop,
    push: clipboardPush,
    replace: clipboardReplace,
    ...clipboard
  } = React.useContext(ClipboardContext);
  const selectionBlocks: [Block] = useEditorSelector(
    useAutoCallback(({ blocks, selection }) =>
      blocks.filter(({ id }) => selection.includes(id))
    )
  );
  const { close } = React.useContext(MenuContext);

  const isContainer = selectionBlocks.some(isBlockLayout);
  const isShape = selectionBlocks.some(
    (block) => block.type === blockTypes.SHAPE
  );

  return (
    <ContextMenu id={'item'}>
      <CreateLayoutButton
        as={ItemMenuButton}
        disabled={
          selectionBlocks.length < 2 ||
          selectionBlocks.some(
            (nextBlock) =>
              nextBlock['parent_id'] !== selectionBlocks[0]['parent_id']
          )
        }
        onClick={close}
        {...((isContainer || isShape) && { display: 'none' })}
      >
        Create layout
      </CreateLayoutButton>

      <ItemMenuButton
        disabled={selectionBlocks.length === 0}
        onClick={useCopyCallback()}
      >
        Copy
      </ItemMenuButton>

      <ItemMenuButton
        disabled={selectionBlocks.length === 0}
        onClick={useCutCallback()}
      >
        Cut
      </ItemMenuButton>

      <ItemMenuButton
        disabled={!isContainer || clipboard.type !== CREATE_BLOCK}
        onClick={usePasteCallback()}
      >
        Paste
      </ItemMenuButton>

      <DeleteBlockButton as={ItemMenuButton} onClick={close}>
        Delete
      </DeleteBlockButton>
    </ContextMenu>
  );
}

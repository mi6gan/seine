// @flow
import { equals } from 'ramda';

import { createBlock } from '../utils';
import type {
  Block,
  BlockBody,
  BlockFormat,
  BlockId,
  LayoutType,
} from '../types';
import { blockTypes } from '../types';

opaque type BlockExtension = {
  editor: { [string]: any },
};
export type BlocksState = {
  blocks: $ReadOnlyArray<Block & BlockExtension>,
  selection: $ReadOnlyArray<BlockId>,
};
export const initialBlocksState: BlocksState = {
  blocks: [],
  selection: [],
};

export const CREATE_BLOCK = '@seine/core/createBlock';
export type CreateBlockAction = {
  type: typeof CREATE_BLOCK,
  id?: BlockId,
  block: $Shape<Block>,
};

export const CREATE_BOTTOM_BLOCK = '@seine/core/createBottomBlock';
export type CreateBottomBlockAction = {
  type: typeof CREATE_BOTTOM_BLOCK,
  id: BlockId,
  block: $Shape<Block>,
};

export const CREATE_LEFT_BLOCK = '@seine/core/createLeftBlock';
export type CreateLeftBlockAction = {
  type: typeof CREATE_LEFT_BLOCK,
  id: BlockId,
  block: $Shape<Block>,
};

export const CREATE_RIGHT_BLOCK = '@seine/core/createRightBlock';
export type CreateRightBlockAction = {
  type: typeof CREATE_RIGHT_BLOCK,
  id: BlockId,
  block: $Shape<Block>,
};

export const CREATE_TOP_BLOCK = '@seine/core/createTopBlock';
export type CreateTopBlockAction = {
  type: typeof CREATE_TOP_BLOCK,
  id: BlockId,
  block: $Shape<Block>,
};

export const DELETE_BLOCK = '@seine/core/deleteBlock';
export type DeleteBlockAction = {
  id: BlockId,
  type: typeof DELETE_BLOCK,
};

export const DELETE_SELECTED_BLOCKS = '@seine/core/deleteSelectedBlocks';
export type DeleteSelectedBlocksAction = {
  type: typeof DELETE_SELECTED_BLOCKS,
};

export const DESELECT_ALL_BLOCKS = '@seine/core/deselectAllBlocks';
export type DeselectAllBlocksAction = {
  type: typeof DESELECT_ALL_BLOCKS,
};

export const SELECT_BLOCK = '@seine/core/selectBlock';
export type SelectBlockAction = {
  type: typeof SELECT_BLOCK,
  id: BlockId,
  modifier?: 'add' | 'sub',
};

export const UPDATE_BLOCK_BODY = '@seine/core/updateBlockBody';
export type UpdateBlockDataAction = {
  type: typeof UPDATE_BLOCK_BODY,
  body: BlockBody,
};

export const UPDATE_BLOCK_FORMAT = '@seine/core/updateBlockFormat';
export type UpdateBlockFormatAction = {
  type: typeof UPDATE_BLOCK_FORMAT,
  format: BlockFormat,
  id?: BlockId,
};

export const UPDATE_BLOCK_LAYOUT = '@seine/core/updateBlockLayout';
export type UpdateBlockLayout = {
  type: typeof UPDATE_BLOCK_LAYOUT,
  layout: LayoutType,
  id?: BlockId,
};

//
// Memoize editor's inner state.
//
// Should be cleaned in onChange callbacks as it is
// done in Editor component.
//
export const UPDATE_BLOCK_EDITOR = '@seine/editor/updateBlockEditor';
export type UpdateBlockEditorAction = {
  type: typeof UPDATE_BLOCK_EDITOR,
  editor: { [string]: any },
};

export type BlocksCreateAction =
  | CreateBlockAction
  | CreateBottomBlockAction
  | CreateLeftBlockAction
  | CreateRightBlockAction
  | CreateTopBlockAction;

export type BlocksAction =
  | BlocksCreateAction
  | DeleteSelectedBlocksAction
  | DeselectAllBlocksAction
  | SelectBlockAction
  | UpdateBlockDataAction
  | UpdateBlockFormatAction
  | UpdateBlockEditorAction
  | UpdateBlockLayout;

/**
 * @description Reduce Content editor actions
 * @param {BlocksState} state
 * @param {BlocksAction} action
 * @returns {BlocksState}
 */
export function reduceBlocks(
  state: BlocksState = initialBlocksState,
  action: BlocksAction
): BlocksState {
  switch (action.type) {
    case CREATE_BLOCK:
      return {
        ...state,
        blocks: [
          ...state.blocks,
          action.id ? { ...action.block, parent_id: action.id } : action.block,
        ],
      };

    case CREATE_TOP_BLOCK:
    case CREATE_BOTTOM_BLOCK: {
      let index = state.blocks.findIndex(({ id }) => id === action.id);
      if (index === -1) {
        return state;
      }
      const parentIndex = state.blocks.findIndex(
        ({ id }) => id === state.blocks[index].parent_id
      );
      if (parentIndex > -1) {
        index = parentIndex;
      }

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(
            0,
            index + +(action.type === CREATE_BOTTOM_BLOCK)
          ),
          { ...action.block, parent_id: state.blocks[index].parent_id },
          ...state.blocks.slice(index + +(action.type === CREATE_BOTTOM_BLOCK)),
        ],
      };
    }

    case CREATE_LEFT_BLOCK:
    case CREATE_RIGHT_BLOCK: {
      const index = state.blocks.findIndex(({ id }) => id === action.id);
      if (index === -1) {
        return state;
      }
      const parentIndex = state.blocks.findIndex(
        ({ id, type }) =>
          id === state.blocks[index].parent_id && type === blockTypes.GRID
      );

      const parent =
        state.blocks[parentIndex] ||
        createBlock(
          blockTypes.GRID,
          null,
          null,
          state.blocks[index]['parent_id']
        );

      const block = { ...action.block, parent_id: parent.id };
      const target =
        state.blocks[index].parent_id !== parent.id
          ? { ...state.blocks[index], parent_id: parent.id }
          : state.blocks[index];

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          ...(parentIndex === -1 ? [parent] : []),
          ...(action.type === CREATE_LEFT_BLOCK
            ? [block, target]
            : [target, block]),
          ...state.blocks.slice(index + 1),
        ],
      };
    }

    case SELECT_BLOCK: {
      const index = state.selection.indexOf(action.id);

      switch (action.modifier) {
        case 'add': {
          if (index !== -1) {
            return state;
          }
          return {
            ...state,
            selection: [...state.selection, action.id],
          };
        }

        case 'sub':
          if (index === -1) {
            return state;
          }
          return {
            ...state,
            selection: [
              ...state.selection.slice(0, index),
              ...state.selection.slice(index + 1),
            ],
          };

        default:
          return { ...state, selection: [action.id] };
      }
    }

    case DELETE_SELECTED_BLOCKS:
    case DELETE_BLOCK: {
      const selection =
        action.type === DELETE_BLOCK ? [action.id] : state.selection;
      if (selection.length === 0) {
        return state;
      }
      const blocks = state.blocks.filter(({ id }) => !selection.includes(id));
      const redundant = blocks.filter(
        ({ id, type }, _, blocks) =>
          type === blockTypes.GRID &&
          blocks.filter(({ parent_id }) => parent_id === id).length < 2
      );
      return {
        ...state,
        selection: initialBlocksState.selection,
        blocks: blocks
          .filter((block) => !redundant.includes(block))
          .map((block) => {
            const redundantParent = redundant.find(
              ({ id }) => block.parent_id === id
            );
            return redundantParent
              ? { ...block, parent_id: redundantParent.parent_id }
              : block;
          }),
      };
    }

    case DESELECT_ALL_BLOCKS: {
      if (state.selection.length === 0) {
        return state;
      }
      return {
        ...state,
        selection: initialBlocksState.selection,
      };
    }

    case UPDATE_BLOCK_BODY:
    case UPDATE_BLOCK_EDITOR:
    case UPDATE_BLOCK_FORMAT:
    case UPDATE_BLOCK_LAYOUT: {
      const index = state.blocks.findIndex(
        ({ id }) =>
          ('id' in action && action.id === id) || state.selection.includes(id)
      );

      if (index === -1) {
        return {
          ...state,
          error: 'Selection is empty or invalid.',
        };
      }

      if (!('id' in action) && state.selection.length > 1) {
        return {
          ...state,
          error: 'There is more than one block in selection.',
        };
      }

      if (
        action.type === UPDATE_BLOCK_LAYOUT &&
        !['none', 'flex', 'grid'].includes(action.layout)
      ) {
        return {
          ...state,
          error: 'Unrecognized layout type',
        };
      }

      const block = state.blocks[index];
      if (
        action.type !== UPDATE_BLOCK_EDITOR ||
        !block.editor ||
        !Object.entries(action.editor).every(([key, value]) =>
          equals(value, block.editor[key])
        )
      ) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, index),
            {
              ...block,
              ...(action.type === UPDATE_BLOCK_BODY
                ? { body: { ...block.body, ...action.body } }
                : action.type === UPDATE_BLOCK_EDITOR
                ? { editor: { ...block.editor, ...action.editor } }
                : action.type === UPDATE_BLOCK_LAYOUT
                ? { type: action.layout }
                : { format: { ...block.format, ...action.format } }),
            },
            ...state.blocks.slice(index + 1),
          ],
        };
      }
      return state;
    }

    default:
      return state;
  }
}

// @flow
import { equals, filter } from 'ramda';

import { createBlock, filterBlockAncestors } from '../utils';
import type { Block, BlockBody, BlockFormat, BlockId } from '../types';
import { blockTypes, defaultFlexFormat, layoutTypes } from '../types';

opaque type BlockExtension = {
  editor: { [string]: any },
};
export type BlocksState = {
  blocks: $ReadOnlyArray<Block & BlockExtension>,
  selection: $ReadOnlyArray<BlockId>,
  device: 'mobile' | 'any',
};
export const initialBlocksState: BlocksState = {
  blocks: [],
  selection: [],
  device: 'any',
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

export const SET_BLOCKS_SELECTION = '@seine/core/setBlocksSelection';
export type SetBlocksSelectionAction = {
  type: typeof SET_BLOCKS_SELECTION,
  selection: BlockId[],
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

export const SET_BLOCK_PARENT = '@seine/core/setBlockParent';
export type SetBlockParentAction = {
  type: typeof SET_BLOCK_PARENT,
  id: BlockId,
  parentId: BlockId,
};

export const SET_DEVICE = '@seine/core/setDevice';
export type SetDeviceAction = {
  type: typeof SET_DEVICE,
  device: 'mobile' | 'any',
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
  | DeleteBlockAction
  | SelectBlockAction
  | UpdateBlockDataAction
  | UpdateBlockFormatAction
  | UpdateBlockEditorAction
  | SetBlocksSelectionAction
  | SetBlockParentAction
  | SetDeviceAction;

/**
 * @description Reduce Content editor actions
 * @param {BlocksState} inputState
 * @param {BlocksAction} action
 * @returns {BlocksState}
 */
export function reduceBlocks(
  inputState: BlocksState = initialBlocksState,
  action: BlocksAction
): BlocksState {
  const { error, ...validState } = inputState;
  const state: BlocksState = validState;

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
        ({ id, type, format, direction }) =>
          id === state.blocks[index].parent_id &&
          type === blockTypes.LAYOUT &&
          format &&
          format === 'flex' &&
          direction === 'column'
      );
      if (parentIndex > -1) {
        index = parentIndex;
      }

      if (state.blocks[parentIndex]) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(
              0,
              index + +(action.type === CREATE_BOTTOM_BLOCK)
            ),
            { ...action.block, parent_id: state.blocks[parentIndex].id },
            ...state.blocks.slice(
              index + +(action.type === CREATE_BOTTOM_BLOCK)
            ),
          ],
        };
      } else {
        const parent = createBlock(
          blockTypes.LAYOUT,
          {},
          { ...defaultFlexFormat, direction: 'column' },
          state.blocks[index].parent_id
        );
        const blocks = [
          { ...action.block, parent_id: parent.id },
          { ...state.blocks[index], parent_id: parent.id },
        ];
        if (action.type === CREATE_BOTTOM_BLOCK) {
          blocks.reverse();
        }

        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, index),
            parent,
            ...blocks,
            ...state.blocks.slice(index + 1),
          ],
        };
      }
    }

    case CREATE_LEFT_BLOCK:
    case CREATE_RIGHT_BLOCK: {
      const index = state.blocks.findIndex(({ id }) => id === action.id);
      if (index === -1) {
        return state;
      }
      const parentIndex = state.blocks.findIndex(
        ({ id, type }) =>
          id === state.blocks[index].parent_id && type === blockTypes.LAYOUT
      );

      const parent =
        state.blocks[parentIndex] ||
        createBlock(
          blockTypes.LAYOUT,
          null,
          { kind: layoutTypes.GRID },
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

    case SET_BLOCKS_SELECTION: {
      return {
        ...state,
        selection: action.selection
          .reduce(
            (acc, id) => [...acc, ...filterBlockAncestors(id, state.blocks)],
            []
          )
          .map(({ id }) => id),
      };
    }

    case SELECT_BLOCK: {
      if (state.selection.includes(action.id) !== (action.modifier === 'sub')) {
        return state;
      }

      let selectedBlocks = filterBlockAncestors(action.id, state.blocks);
      if (action.modifier === 'add') {
        selectedBlocks = state.blocks.filter(
          (block) =>
            selectedBlocks.includes(block) || state.selection.includes(block.id)
        );
      } else if (action.modifier === 'sub') {
        selectedBlocks = state.blocks.filter(
          (block) => !selectedBlocks.includes(block)
        );
      }
      return {
        ...state,
        selection: state.blocks
          .filter((parent) => {
            if (selectedBlocks.includes(parent)) {
              return true;
            }
            const selectedChildren = selectedBlocks.filter(
              (block) => block['parent_id'] === parent.id
            );
            const children =
              selectedChildren.length > 0 &&
              state.blocks.filter((block) => block['parent_id'] === parent.id);
            return children && children.length === selectedChildren.length;
          })
          .map(({ id }) => id),
      };
    }

    case DELETE_SELECTED_BLOCKS:
    case DELETE_BLOCK: {
      const selection =
        action.type === DELETE_BLOCK ? [action.id] : state.selection;
      if (selection.length === 0) {
        return state;
      }
      const blocks = state.blocks.filter(
        ({ id, type }) => !selection.includes(id) || type === blockTypes.PAGE
      );
      const redundant = blocks.filter(
        ({ id, type }, _, blocks) =>
          type === blockTypes.LAYOUT &&
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
    case UPDATE_BLOCK_FORMAT: {
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
                : {
                    format:
                      state.device === 'any'
                        ? filter((value) => value !== null, {
                            ...block.format,
                            ...action.format,
                          })
                        : {
                            ...block.format,
                            [state.device]: filter((value) => value !== null, {
                              ...(block.format && block.format[state.device]),
                              ...action.format,
                            }),
                          },
                  }),
            },
            ...state.blocks.slice(index + 1),
          ],
        };
      }
      return state;
    }

    case SET_BLOCK_PARENT: {
      const index = state.blocks.findIndex((block) => block.id === action.id);
      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, index),
          ...state.blocks.slice(index + 1),
          {
            ...state.blocks[index],
            parent_id: action.parentId,
          },
        ],
      };
    }

    case SET_DEVICE: {
      return {
        ...state,
        device: action.device,
      };
    }

    default:
      return state;
  }
}

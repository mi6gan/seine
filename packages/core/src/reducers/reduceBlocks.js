// @flow
import { equals, filter } from 'ramda';

import { filterBlockAncestors, isBlockLayout } from '../utils';
import type { Block, BlockBody, BlockFormat, BlockId } from '../types';
import { blockTypes, defaultItemFormat } from '../types';

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

export const MOVE_BLOCK = '@seine/core/moveBlock';
export type MoveBlockAction = {
  type: typeof MOVE_BLOCK,
  id: BlockId,
  targetId: BlockId,
  position: 'before' | 'after',
};

export const UPGRADE_BLOCK_VERSION = '@seine/core/upgradeBlockVersion';
export type UpgradeBlockVersionAction = {
  type: typeof UPGRADE_BLOCK_VERSION,
  id?: BlockId,
};

export const RESET_BLOCKS = '@seine/core/resetBlocks';
export type ResetBlocksAction = {
  type: typeof RESET_BLOCKS,
  blocks: Block[],
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
  shallow?: boolean,
};

export type BlocksAction =
  | CreateBlockAction
  | DeleteSelectedBlocksAction
  | DeselectAllBlocksAction
  | DeleteBlockAction
  | SelectBlockAction
  | UpdateBlockDataAction
  | UpdateBlockFormatAction
  | UpdateBlockEditorAction
  | SetBlocksSelectionAction
  | SetBlockParentAction
  | SetDeviceAction
  | MoveBlockAction
  | UpgradeBlockVersionAction
  | ResetBlocksAction;

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
        selection: [action.block.id],
        blocks: [
          ...state.blocks,
          action.id ? { ...action.block, parent_id: action.id } : action.block,
        ],
      };

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
              selectedChildren.length > 1 &&
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
    case UPDATE_BLOCK_FORMAT:
    case UPGRADE_BLOCK_VERSION: {
      const index = state.blocks.findIndex(({ id }) =>
        'id' in action ? action.id === id : state.selection.includes(id)
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
        !(action.shallow
          ? action.editor === block.editor
          : Object.entries(action.editor).every(([key, value]) =>
              equals(value, block.editor[key])
            ))
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
                : action.type === UPGRADE_BLOCK_VERSION
                ? {
                    type: block.type.replace(/^.+\//, ''),
                    format: {
                      ...block.format,
                      version: defaultItemFormat.version,
                    },
                  }
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

    case MOVE_BLOCK: {
      const index = state.blocks.findIndex(({ id }) => action.id === id);
      const targetIndex = state.blocks.findIndex(
        ({ id }) => action.targetId === id
      );
      const { parent_id } = state.blocks[targetIndex];
      const [firstIndex, lastIndex] = [index, targetIndex].sort();

      const insertion = [
        { ...state.blocks[index], parent_id },
        state.blocks[targetIndex],
      ];
      if (action.position === 'after') {
        insertion.reverse();
      }

      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, firstIndex),
          ...(firstIndex === targetIndex ? insertion : []),
          ...state.blocks.slice(firstIndex + 1, lastIndex),
          ...(lastIndex === targetIndex ? insertion : []),
          ...state.blocks.slice(lastIndex + 1),
        ].filter(
          (block, index, blocks) =>
            !isBlockLayout(block) ||
            blocks.slice(index).some((child) => child.parent_id === block.id)
        ),
      };
    }

    case RESET_BLOCKS: {
      return {
        ...state,
        blocks: action.blocks,
      };
    }

    default:
      return state;
  }
}

// @flow
import type { BlockElement } from '../types';

export type ElementsState = {
  selection: number,
  elements: $ReadOnlyArray<BlockElement>,
};

export const initialElementsState: ElementsState = {
  selection: -1,
  elements: [],
};

export const PUSH_BLOCK_ELEMENT = '@seine/core/pushBlockElement';
type PushBlockElementAction = {
  type: typeof PUSH_BLOCK_ELEMENT,
  body: $Shape<BlockElement>,
};

export const REMOVE_BLOCK_ELEMENT = '@seine/core/removeBlockElement';
type RemoveBlockElementAction = {
  type: typeof REMOVE_BLOCK_ELEMENT,
  index: number,
};

export const SELECT_BLOCK_ELEMENT = '@seine/core/selectBlockElement';
type SelectBlockElementAction = {
  type: typeof SELECT_BLOCK_ELEMENT,
  index: number | null,
};

export const DESELECT_BLOCK_ELEMENT = '@seine/core/deselectBlockElement';
type DeselectBlockElementAction = {
  type: typeof DESELECT_BLOCK_ELEMENT,
  index: number,
};

export const UPDATE_BLOCK_ELEMENT = '@seine/core/updateBlockElement';
type UpdateBlockElementAction = {
  type: typeof UPDATE_BLOCK_ELEMENT,
  index: number,
  body: $Shape<BlockElement>,
};

export const UPDATE_BLOCK_ELEMENT_BY_TITLE =
  '@seine/core/updateBlockElementByTitle';
type UpdateBlockElementByIdAction = {
  type: typeof UPDATE_BLOCK_ELEMENT_BY_TITLE,
  title: string,
  body: BlockElement,
};

export const UPDATE_BLOCK_ELEMENT_BY_GROUP = '@seine/core/updateElementByGroup';
type UpdateBlockElementByGroup = {
  type: typeof UPDATE_BLOCK_ELEMENT_BY_GROUP,
  group: string,
  body: BlockElement,
};

export type ElementsAction =
  | PushBlockElementAction
  | UpdateBlockElementAction
  | UpdateBlockElementByIdAction
  | UpdateBlockElementByGroup
  | RemoveBlockElementAction
  | SelectBlockElementAction
  | DeselectBlockElementAction;

/**
 * @description Reduce actions of block elements.
 * @param {ElementsState} state
 * @param {ElementsAction} action
 * @returns {ElementsState}
 */
export function reduceElements(
  state: ElementsState = initialElementsState,
  action: ElementsAction
): ElementsState {
  switch (action.type) {
    case PUSH_BLOCK_ELEMENT:
      return {
        ...state,
        elements: [...state.elements, action.body],
      };
    case UPDATE_BLOCK_ELEMENT:
      return {
        ...state,
        elements: [
          ...state.elements.slice(0, action.index),
          { ...state.elements[action.index], ...action.body },
          ...state.elements.slice(action.index + 1),
        ],
      };
    case UPDATE_BLOCK_ELEMENT_BY_TITLE:
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.title === action.title
            ? { ...element, ...action.body }
            : element
        ),
      };
    case UPDATE_BLOCK_ELEMENT_BY_GROUP:
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.group === action.group
            ? { ...element, ...action.body }
            : element
        ),
      };
    case REMOVE_BLOCK_ELEMENT:
      return {
        ...state,
        elements: [
          ...state.elements.slice(0, action.index),
          ...state.elements.slice(action.index + 1),
        ],
      };

    case SELECT_BLOCK_ELEMENT: {
      if (state.selection === action.index) {
        return state;
      }
      return {
        ...state,
        selection: action.index,
      };
    }

    case DESELECT_BLOCK_ELEMENT: {
      if (state.selection !== action.index) {
        return state;
      }
      return {
        ...state,
        selection: -1,
      };
    }

    default:
      return state;
  }
}

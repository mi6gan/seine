// @flow
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import type { ElementsAction } from '@seine/core';
import {
  initialElementsState,
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';

// eslint-disable-next-line
export default function useChartDispatchElements() {
  const {
    item: {
      body,
      editor = {
        selection: initialElementsState.selection,
      },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();

  return useAutoCallback((action: ElementsAction) => {
    const { elements, selection } = reduceElements(
      {
        elements: body && body.elements,
        selection: editor ? editor.selection : initialElementsState.selection,
      },
      action
    );

    if (body && elements !== body.elements) {
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements },
      });
    }

    if (selection !== editor.selection) {
      dispatch({
        type: UPDATE_BLOCK_EDITOR,
        editor: { selection },
      });
    }
  });
}

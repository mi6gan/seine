// @flow
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch, defaultEditorSelector } from '../blocks';

import useChartBlock from './useChartBlock';

import type { ElementsAction } from '@seine/core';
import {
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';

// eslint-disable-next-line
export default function useChartDispatchElements(
  blocksSelector = defaultEditorSelector
) {
  const { body, editor } = useChartBlock(blocksSelector);
  const dispatch = useBlocksDispatch();

  return useAutoCallback((action: ElementsAction) => {
    const { elements, selection } = reduceElements(
      {
        elements: body.elements,
        selection: editor.selection,
      },
      action
    );

    if (elements !== body.elements) {
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

// @flow
import { useAutoCallback } from 'hooks.macro';
import type { ElementsAction } from '@seine/core';
import {
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';

import { useBlocksDispatch } from '../store';
import { defaultBlocksSelector } from '../store/useBlocksSelector';

import useChartBlock from './useChartBlock';

// eslint-disable-next-line
export default function useChartDispatchElements(
  blocksSelector = defaultBlocksSelector
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

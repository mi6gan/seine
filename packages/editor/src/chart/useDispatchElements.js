// @flow
import { useAutoCallback } from 'hooks.macro';
import type { ElementsAction } from '@seine/core';
import {
  blockTypes,
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';

import { useEditorDispatch, useSelectedBlocks } from '../store';

import { defaultChartEditor } from './constants';

// eslint-disable-next-line
export default function useDispatchElements() {
  const selectedBlock = useSelectedBlocks().find(
    (block) => block.type === blockTypes.CHART
  );
  const body = selectedBlock && selectedBlock.body;
  const editor = selectedBlock && (selectedBlock.editor || defaultChartEditor);
  const dispatch = useEditorDispatch();

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

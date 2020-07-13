// @flow
import { useAutoCallback } from 'hooks.macro';
import type { ElementsAction } from '@seine/core';
import {
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  blockTypes,
} from '@seine/core';

import { useEditorDispatch, useSelectedBlocks } from '../store';

// eslint-disable-next-line
export default function useDispatchElements() {
  const selected = useSelectedBlocks().find(
    (block) => block.type === blockTypes.CHART
  );
  const body = selected && selected.body;
  const editor = selected && selected.editor;
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

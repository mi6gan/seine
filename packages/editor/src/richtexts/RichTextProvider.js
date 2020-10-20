// @flow
import * as React from 'react';
import { useAutoMemo, useAutoCallback, useAutoEffect } from 'hooks.macro';

import RichTextContext from './RichTextContext';

import { UPDATE_BLOCK_BODY } from '@seine/core';
import { useBlocksDispatch, useSelectedLayoutItems } from '@seine/editor';
import { toDraftEditor, toRawContent } from '@seine/content';

// eslint-disable-next-line
export default function RichTextProvider({ children }) {
  const dispatch = useBlocksDispatch();
  const { item } = useSelectedLayoutItems();
  const { entityMap = null, blocks = null } = (item && item.body) || {};
  const { id = null } = item || {};
  const [editorState, setEditorState] = React.useState(null);
  const editorStateRef = React.useRef(editorState);
  const onChange = useAutoCallback((state) => {
    setEditorState(state);
  });

  useAutoEffect(() => {
    editorStateRef.current = editorState;
  });

  React.useEffect(() => {
    if (id) {
      setEditorState(toDraftEditor({ entityMap, blocks }));
      return () => {
        dispatch({
          id,
          type: UPDATE_BLOCK_BODY,
          body: toRawContent(editorStateRef.current),
        });
      };
    } else {
      setEditorState(null);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <RichTextContext.Provider
      value={useAutoMemo({
        editorState,
        onChange,
      })}
    >
      {children}
    </RichTextContext.Provider>
  );
}

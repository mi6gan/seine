// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { BlockEditor, RichTextBody, RichTextFormat } from '@seine/core';
import {
  blockTypes,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import {
  defaultDraftBody,
  defaultDraftFormat,
  Item,
  RichTextStyle,
} from '@seine/content';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

import Frame from '../ui/Frame';
import { useEditorDispatch, useSelectedBlocks } from '../store';

type Props = (RichTextBody & RichTextFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const Container = styled(Item)`
  height: 100%;
  cursor: text;

  .DraftEditor-root {
    height: 100%;
  }
  .public-DraftEditor-content {
    display: grid;
    height: 100%;
    align-items: ${({ verticalAlignment = 'start' }) => verticalAlignment};
  }
`;

export const defaultDraftEditor = {
  state: null,
};

/**
 * @description Draft block editor component.
 * @returns {React.Node}
 */
export default function RichTextEditor({
  id,
  editor: { state = defaultDraftEditor.state } = defaultDraftEditor,
  blocks = defaultDraftBody.blocks,
  entityMap = defaultDraftBody.entityMap,
  textAlignment = defaultDraftFormat.textAlignment,
  verticalAlignment = defaultDraftFormat.verticalAlignment,
}: Props) {
  const selected = useSelectedBlocks().some(
    ({ type }) => type === blockTypes.RICH_TEXT
  );
  const dispatch = useEditorDispatch();

  const editorRef = React.useRef<?Editor>(null);

  useAutoEffect(() => {
    const { current } = editorRef;
    if (selected && current && current.editor) {
      current.editor.focus();
    }
  });

  const editorState = React.useMemo(
    () =>
      state ||
      EditorState.createWithContent(
        convertFromRaw({
          blocks,
          entityMap,
        })
      ),
    // eslint-disable-next-line
    [id, state]
  );

  useAutoEffect(() => {
    if (editorState && !selected) {
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: convertToRaw(editorState.getCurrentContent()),
      });
    }
  });

  return (
    <>
      <RichTextStyle />
      <Frame
        selected={selected}
        as={Container}
        id={id}
        dispatch={dispatch}
        verticalAlignment={verticalAlignment}
      >
        <Editor
          editorKey={id}
          textAlignment={textAlignment}
          editorState={editorState}
          ref={editorRef}
          onChange={useAutoCallback((state) =>
            dispatch({
              type: UPDATE_BLOCK_EDITOR,
              editor: { state },
            })
          )}
          readOnly={!selected}
        />
      </Frame>
    </>
  );
}

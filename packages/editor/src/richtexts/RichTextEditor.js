// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import styled from 'styled-components/macro';

import type { BlockEditor, RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';
import {
  defaultDraftBody,
  defaultDraftFormat,
  Item,
  RichTextStyle,
} from '@seine/content';
import {
  Frame,
  useBlocksDispatch,
  useSelectedLayoutItems,
} from '@seine/editor';

type Props = (RichTextBody & RichTextFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const Container = styled(Item)`
  cursor: text;
  .public-DraftEditor-content {
    display: flex;
    align-items: ${({ verticalAlignment = 'start' }) => verticalAlignment};
  }
`;

export const defaultDraftEditor = {
  state: null,
};

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function RichTextEditor({
  id,
  editor: { state = defaultDraftEditor.state } = defaultDraftEditor,
  blocks = defaultDraftBody.blocks,
  entityMap = defaultDraftBody.entityMap,
  textAlignment = defaultDraftFormat.textAlignment,
  verticalAlignment = defaultDraftFormat.verticalAlignment,
  ...itemProps
}: Props) {
  const { item } = useSelectedLayoutItems();
  const selected = !!(item && item.id === id);
  const dispatch = useBlocksDispatch();

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

  React.useEffect(() => {
    if (editorState && !selected) {
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: convertToRaw(editorState.getCurrentContent()),
      });
    }
    // eslint-disable-next-line
  }, [selected]);

  return (
    <>
      <RichTextStyle />
      <Frame
        selected={selected}
        as={Container}
        id={id}
        dispatch={dispatch}
        verticalAlignment={verticalAlignment}
        {...itemProps}
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

// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js';
import styled from 'styled-components/macro';

import { Frame } from '../ui';
import { useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import type { BlockEditor, RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';
import {
  defaultDraftBody,
  defaultDraftFormat,
  RichTextStyle,
  RichText,
} from '@seine/content';

type Props = (RichTextBody & RichTextFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const StyledFrame = styled(Frame)`
  .DraftEditor-root {
    cursor: text;
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
      <RichText
        {...itemProps}
        id={id}
        ref={editorRef}
        forwardedAs={StyledFrame}
        selected={selected}
        textAlignment={textAlignment}
        editorState={editorState}
        onChange={useAutoCallback((state) =>
          dispatch({
            type: UPDATE_BLOCK_EDITOR,
            editor: { state },
          })
        )}
        readOnly={!selected}
      />
    </>
  );
}

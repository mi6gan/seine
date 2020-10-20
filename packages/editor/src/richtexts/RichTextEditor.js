// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';
import { Editor } from 'draft-js';
import styled from 'styled-components/macro';

import { Frame } from '../ui';

import RichTextContext from './RichTextContext';

import type { BlockEditor, RichTextBody, RichTextFormat } from '@seine/core';
import {
  defaultDraftBody,
  RichText,
  RichTextStyle,
  toDraftEditor,
} from '@seine/content';
import { useSelectedLayoutItems } from '@seine/editor';

type Props = (RichTextBody & RichTextFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const StyledFrame = styled(Frame)`
  .DraftEditor-root {
    cursor: text;
  }
`;

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function RichTextEditor({
  id,
  blocks = defaultDraftBody.blocks,
  entityMap = defaultDraftBody.entityMap,
  ...itemProps
}: Props) {
  const { editorState, onChange } = React.useContext(RichTextContext);
  const editorRef = React.useRef<?Editor>(null);
  const { current: editor } = editorRef;

  const { item } = useSelectedLayoutItems();
  const selected = !!(item && item.id === id);

  useAutoEffect(() => {
    if (editorState && selected && editor) {
      if (
        !document.activeElement ||
        !(document.activeElement instanceof HTMLInputElement)
      ) {
        editor.focus();
      }
    }
  });

  return (
    <>
      <RichTextStyle />
      <RichText
        {...itemProps}
        id={id}
        selected={selected}
        editorState={useAutoMemo(
          (selected && editorState) || toDraftEditor({ blocks, entityMap })
        )}
        onChange={onChange}
        ref={editorRef}
        forwardedAs={StyledFrame}
        readOnly={!selected}
      />
    </>
  );
}

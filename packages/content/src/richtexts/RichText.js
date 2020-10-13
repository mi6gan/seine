// @flow
import { useAutoMemo, useAutoCallback } from 'hooks.macro';
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  DefaultDraftBlockRenderMap,
  DefaultDraftInlineStyle,
  Editor,
  getDefaultKeyBinding,
} from 'draft-js';

import { Item } from '../layouts';

import { toDraftEditor } from './helpers';
import RichTextStyle from './RichTextStyle';

import type { RichTextBody, RichTextFormat } from '@seine/core';

export type Props = (RichTextBody & RichTextFormat) & {
  className: string,
};

export const defaultDraftBlocks = [];
export const defaultDraftEntityMap = {};
export const defaultDraftBody = {
  blocks: defaultDraftBlocks,
  entityMap: defaultDraftEntityMap,
};
export const defaultDraftFormat: RichTextFormat = {};

/**
 * @description Draft block component.
 * @param {Props} props
 * @returns {React.Node}
 */
const Draft = React.forwardRef(function Draft(
  {
    id,
    className = '',
    blockRenderMap = DefaultDraftBlockRenderMap,
    blockRendererFn = () => null,
    blockStyleFn = () => '',
    keyBindingFn = getDefaultKeyBinding,
    readOnly = true,
    spellCheck = false,
    stripPastedStyles = false,
    customStyleMap = DefaultDraftInlineStyle,
    textAlignment = 'left',
    blocks = defaultDraftBlocks,
    entityMap = defaultDraftEntityMap,
    editorState = null,
    as: EditorItem = Item,
    ...editorProps
  }: Props,
  ref
) {
  return (
    <>
      <RichTextStyle />
      <EditorItem
        className={[
          className,
          ' DraftEditor/root',
          ' DraftEditor/align',
          textAlignment[0].toUpperCase(),
          textAlignment.slice(1),
        ].join('')}
        id={id}
        {...editorProps}
      >
        <Editor
          {...editorProps}
          editorKey={id}
          ref={ref}
          readOnly={readOnly}
          textAlignment={textAlignment}
          editorState={useAutoMemo(
            editorState || toDraftEditor({ blocks, entityMap })
          )}
          blockRenderMap={blockRenderMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={useAutoCallback((block) =>
            `${blockStyleFn(block)} ${className}`.trim()
          )}
          keyBindingFn={keyBindingFn}
          spellChek={spellCheck}
          customStyleMap={customStyleMap}
        />
      </EditorItem>
    </>
  );
});

const RichText = styled(Draft)`
  text-align: ${({ textAlignment = 'left' }: RichTextFormat) => textAlignment};
`;

export default RichText;

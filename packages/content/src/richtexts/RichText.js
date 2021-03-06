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
import useElementOnlyProps from '../useElementOnlyProps';

import { toDraftEditor } from './helpers';
import RichTextStyle from './RichTextStyle';

import type { RichTextBody, RichTextFormat } from '@seine/core';
import { defaultRichTextFormat } from '@seine/core';

export type Props = (RichTextBody & RichTextFormat) & {
  className: string,
};

export const defaultDraftBlocks = [];
export const defaultDraftEntityMap = {};
export const defaultDraftBody = {
  blocks: defaultDraftBlocks,
  entityMap: defaultDraftEntityMap,
};

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
    blocks = defaultDraftBlocks,
    entityMap = defaultDraftEntityMap,
    editorState = null,
    as: EditorItem = Item,
    itemRef,
    ...editorProps
  }: Props,
  ref
) {
  return (
    <>
      <RichTextStyle />
      <EditorItem
        ref={itemRef}
        className={[className, ' DraftEditor/root', ' DraftEditor/align'].join(
          ''
        )}
        id={id}
        {...useElementOnlyProps(editorProps, defaultRichTextFormat)}
      >
        <Editor
          {...editorProps}
          editorKey={id}
          ref={ref}
          readOnly={readOnly}
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

const RichText = styled(Draft)``;

export default RichText;

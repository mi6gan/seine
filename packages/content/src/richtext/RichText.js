// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
  DefaultDraftInlineStyle,
  Editor,
  getDefaultKeyBinding,
} from 'draft-js';
import type { RichTextBody, RichTextFormat } from '@seine/core';

import { Item } from '../layout';

import { toDraftEditor } from './helpers';
import RichTextStyle from './RichTextStyle';

export type Props = (RichTextBody & RichTextFormat) & {
  decorators?: CompositeDecorator[],
  className: string,
};

export const defaultDraftBlocks = [];
export const defaultDraftEntityMap = {};
export const defaultDraftBody = {
  blocks: defaultDraftBlocks,
  entityMap: defaultDraftEntityMap,
};
export const defaultDraftFormat: RichTextFormat = {
  textAlignment: 'left',
  verticalAlignment: 'start',
};

/**
 * @description Draft block component.
 * @param {Props} props
 * @returns {React.Node}
 */
function Draft({
  className = '',
  decorators = [],
  blockRenderMap = DefaultDraftBlockRenderMap,
  blockRendererFn = () => null,
  blockStyleFn = () => '',
  keyBindingFn = getDefaultKeyBinding,
  readOnly = false,
  spellCheck = false,
  stripPastedStyles = false,
  customStyleMap = DefaultDraftInlineStyle,
  textAlignment = 'left',
  blocks = defaultDraftBlocks,
  entityMap = defaultDraftEntityMap,
  ...editorProps
}: Props) {
  return (
    <>
      <RichTextStyle />
      <Item
        className={[
          className,
          ' DraftEditor/root',
          ' DraftEditor/align',
          textAlignment[0].toUpperCase(),
          textAlignment.slice(1),
        ].join('')}
        {...editorProps}
      >
        <Editor
          {...editorProps}
          blockRenderMap={blockRenderMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={(block) => `${blockStyleFn(block)} ${className}`.trim()}
          keyBindingFn={keyBindingFn}
          readOnly={readOnly}
          spellChek={spellCheck}
          stripPastedStyles={stripPastedStyles}
          customStyleMap={customStyleMap}
          editorState={React.useMemo(
            () =>
              toDraftEditor(
                { blocks, entityMap },
                new CompositeDecorator(decorators)
              ),
            [blocks, decorators, entityMap]
          )}
        />
      </Item>
    </>
  );
}

const RichText = styled(Draft)`
  display: flex;
  height: 100%;
  align-items: ${({ verticalAlignment = 'start' }: RichTextFormat) =>
    verticalAlignment};
  justify-content: ${({ textAlignment = 'left' }: RichTextFormat) =>
    textAlignment};
`;

export default RichText;
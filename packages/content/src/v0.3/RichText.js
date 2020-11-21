// @flow
import * as React from 'react';
import { useAutoMemo, useAutoCallback } from 'hooks.macro';
import styled, { createGlobalStyle, css } from 'styled-components/macro';
import DraftEditorContents from 'draft-js/lib/DraftEditorContents.react';
import defaultBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap';
import defaultDraftInlineStyle from 'draft-js/lib/DefaultDraftInlineStyle';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';

import { toDraftEditor } from '../richtexts/helpers';

import type { RichTextFormat } from '@seine/core';

const DraftStyle = createGlobalStyle`
  .DraftEditor\\/root, .DraftEditor-root {
  ${({
    theme: {
      typography: { h1, h2, h3, h4, h5, h6, body1 },
    },
  }) => css`
    ${body1};
    h1 {
      ${h1}
    }
    h2 {
      ${h2}
    }
    h3 {
      ${h3}
    }
    h4 {
      ${h4}
    }
    h5 {
      ${h5}
    }
    h6 {
      ${h6}
    }
    ul,
    ol {
      ${{
        ...body1,
        marginTop: 0,
      }}
      & > li {
        display: list-item;
        ${{
          ...body1,
          marginBottom: null,
        }}
      }
  `}
  }
`;

const defaultBlocks = [];
const defaultEntityMap = {};

// eslint-disable-next-line
function RichText({
  className = '',
  blockRenderMap = defaultBlockRenderMap,
  blockRendererFn = () => null,
  blockStyleFn = () => '',
  keyBindingFn = getDefaultKeyBinding,
  readOnly = false,
  spellCheck = false,
  stripPastedStyles = false,
  customStyleMap = defaultDraftInlineStyle,
  textAlignment = 'left',
  blocks = defaultBlocks,
  entityMap = defaultEntityMap,
  ...editorProps
}) {
  return (
    <>
      <DraftStyle />
      <div
        className={[
          className,
          ' DraftEditor/root',
          ' DraftEditor/align',
          textAlignment[0].toUpperCase(),
          textAlignment.slice(1),
        ].join('')}
      >
        <DraftEditorContents
          {...editorProps}
          blockRenderMap={blockRenderMap}
          blockRendererFn={blockRendererFn}
          blockStyleFn={useAutoCallback((block) =>
            `${blockStyleFn(block)} ${className}`.trim()
          )}
          keyBindingFn={keyBindingFn}
          readOnly={readOnly}
          spellChek={spellCheck}
          stripPastedStyles={stripPastedStyles}
          customStyleMap={customStyleMap}
          editorState={useAutoMemo(toDraftEditor({ blocks, entityMap }))}
        />
      </div>
    </>
  );
}

const RichText_v0_3 = styled(RichText)`
  display: flex;
  height: 100%;
  align-items: ${({ verticalAlignment = 'start' }: RichTextFormat) =>
    verticalAlignment};
  justify-content: ${({ textAlignment = 'left' }: RichTextFormat) =>
    textAlignment};
`;

export default RichText_v0_3;

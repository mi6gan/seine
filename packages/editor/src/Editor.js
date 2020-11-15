// @flow
import * as React from 'react';

import { ItemMenuProvider } from './EditorItemMenu';
import defaultTheme from './defaultTheme';
import { EditorProvider } from './blocks';
import { ClipboardProvider } from './clipboard';
import type { EditorViewProps } from './EditorView';
import EditorView from './EditorView';

import { ThemeProvider } from '@seine/styles';
import type { BlockType } from '@seine/core';
import { blockTypes, createBlock } from '@seine/core';
import { useNormalizedBlocks } from '@seine/content';

type Props = EditorViewProps & {
  blockRenderMap?: (BlockType) => React.Node,
};

const defaultEditorChildren = [createBlock(blockTypes.PAGE)];

// eslint-disable-next-line
export default function Editor({
  children = defaultEditorChildren,
  as: View = EditorView,
  theme = defaultTheme,
  ...viewProps
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <EditorProvider blocks={useNormalizedBlocks(children)}>
        <ClipboardProvider>
          <ItemMenuProvider>
            <View {...viewProps} />
          </ItemMenuProvider>
        </ClipboardProvider>
      </EditorProvider>
    </ThemeProvider>
  );
}

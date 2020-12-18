// @flow
import * as React from 'react';

import { ItemMenuProvider } from './EditorItemMenu';
import defaultTheme from './defaultTheme';
import { EditorProvider } from './blocks';
import { ClipboardProvider } from './clipboard';
import type { EditorViewProps } from './EditorView';
import EditorView from './EditorView';

import type { Theme } from '@seine/styles/mui-core.macro.d';
import { ThemeProvider } from '@seine/styles';
import type { Block } from '@seine/core';
import { blockTypes, createBlock } from '@seine/core';
import { useNormalizedBlocks } from '@seine/content';

export const defaultEditorChildren = [createBlock(blockTypes.PAGE)];

type Props = EditorViewProps & {
  /**
   * @description Array of block objects.
   * @default {@link defaultEditorChildren}
   */
  children?: Block[],
  /**
   * @description Editor view component.
   * @default {@link EditorView}
   */
  as?: React.ComponentType<EditorViewProps>,
  /**
   * @description Editor UI theme.
   * @default {@link defaultTheme}
   */
  theme?: Theme,
};

/**
 * @description Editor component.
 * @param {Props} props
 * @returns {React.Component}
 */
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

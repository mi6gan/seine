// @flow
import * as React from 'react';

import MenuProvider from './MenuProvider';
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
  /** Array of block objects. */
  children?: Block[],
  /** Editor view component. */
  as?: React.ComponentType<EditorViewProps>,
  /** Editor UI theme. */
  theme?: Theme,
};

/**
 * @description Editor component.
 * @param {Props} props
 * @returns {React.Component}
 */
export default function Editor({
  as: View = EditorView,
  theme = defaultTheme,
  children = defaultEditorChildren,
  header = null,
  ...viewProps
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <EditorProvider blocks={useNormalizedBlocks(children)}>
        <ClipboardProvider>
          <MenuProvider>
            {header}
            <View {...viewProps} />
          </MenuProvider>
        </ClipboardProvider>
      </EditorProvider>
    </ThemeProvider>
  );
}

// @flow
import type { BlockEditor } from '@seine/core';
import type { ChartProps } from '@seine/content';

export type ChartEditorProps = ChartProps &
  BlockEditor & {
    editor: { selection: number },
  };

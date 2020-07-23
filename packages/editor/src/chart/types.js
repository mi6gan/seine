// @flow
import type { BlockEditor, ChartBody, ChartFormat } from '@seine/core';

export type ChartEditorProps = ChartBody &
  $Shape<ChartFormat> &
  BlockEditor & {
    editor: { selection: number },
  };

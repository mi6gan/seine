import { blockTypes, chartTypes } from '@seine/core';
import {
  defaultBarChartFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultLineChartFormat,
  defaultPieChartFormat,
} from '@seine/content';
import { useAutoMemo } from 'hooks.macro';

import { useEditorSelector, useSelectedBlocks } from '../store';

import { defaultChartEditor } from './constants';

// eslint-disable-next-line
export default function useChartBlock() {
  const device = useEditorSelector((state) => state.device);
  const block = useSelectedBlocks().find(
    ({ type }) => type === blockTypes.CHART
  );
  return {
    ...block,
    editor: block.editor || defaultChartEditor,
    format: useAutoMemo(() => {
      const format =
        (block && block.format && block.format[device]) || block.format || {};
      const defaultFormat =
        format.kind === chartTypes.PIE
          ? defaultPieChartFormat
          : format.kind === chartTypes.LINE
          ? defaultLineChartFormat
          : format.kind === chartTypes.BAR
          ? defaultBarChartFormat
          : format.kind === chartTypes.COLUMN
          ? defaultColumnChartFormat
          : defaultChartFormat;
      for (const [key, value] of Object.entries(defaultFormat)) {
        if (format[key] === void 0) {
          format[key] = value;
        }
      }
      return format;
    }),
  };
}

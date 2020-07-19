import { blockTypes } from '@seine/core';
import { useChartFormat } from '@seine/content';

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
    format: useChartFormat(
      (block && block.format && block.format[device]) || block.format || {}
    ),
  };
}

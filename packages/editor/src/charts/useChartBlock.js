// @flow
import { useAutoMemo } from 'hooks.macro';

import { useEditorSelector, defaultEditorSelector } from '../blocks';

import { defaultChartEditor } from '.';

import { blockTypes } from '@seine/core';
import { defaultChartFormat, useChartFormat } from '@seine/content';

const deviceSelector = (state) => state.device;

// eslint-disable-next-line
export default function useChartBlock(blocksSelector = defaultEditorSelector) {
  const device = useEditorSelector(deviceSelector);
  const [block = {}] = useEditorSelector(blocksSelector).filter(
    ({ type }) => type === blockTypes.CHART
  );
  const {
    format: { [device]: deviceFormat, ...defaultFormat } = defaultChartFormat,
    editor = defaultChartEditor,
  } = block;

  const format = useChartFormat({ ...defaultFormat, ...deviceFormat });
  return useAutoMemo({
    ...block,
    format,
    editor,
  });
}

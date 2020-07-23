// @flow
import { defaultChartFormat, useChartFormat } from '@seine/content';
import { blockTypes } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';

import { useBlocksSelector } from '../context';
import { defaultBlocksSelector } from '../context/useBlocksSelector';

import { defaultChartEditor } from './constants';

const deviceSelector = (state) => state.device;

// eslint-disable-next-line
export default function useChartBlock(blocksSelector = defaultBlocksSelector) {
  const device = useBlocksSelector(deviceSelector);
  const [block = {}] = useBlocksSelector(blocksSelector).filter(
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

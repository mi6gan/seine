// @flow
import { useAutoMemo } from 'hooks.macro';

import { useEditorSelector, defaultEditorSelector } from '../blocks';

import { defaultChartEditor } from './constants';

import { blockTypes, defaultChartFormat, normalizeBlock } from '@seine/core';

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

  return useAutoMemo(
    normalizeBlock({
      ...block,
      ...block,
      format: { ...deviceFormat, ...defaultFormat },
      editor,
    })
  );
}

// @flow
import { useAutoMemo } from 'hooks.macro';

import {
  defaultBarChartFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultLineChartFormat,
  defaultPieChartFormat,
} from './constants';

import type { ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';

// eslint-disable-next-line
export default function useChartFormat(
  chartProps = defaultChartFormat
): $Shape<ChartFormat> {
  return useAutoMemo({
    ...(chartProps.kind === chartTypes.PIE
      ? defaultPieChartFormat
      : chartProps.kind === chartTypes.LINE
      ? defaultLineChartFormat
      : chartProps.kind === chartTypes.BAR
      ? defaultBarChartFormat
      : chartProps.kind === chartTypes.COLUMN
      ? defaultColumnChartFormat
      : defaultChartFormat),
    ...chartProps,
  });
}
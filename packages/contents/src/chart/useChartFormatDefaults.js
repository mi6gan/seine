// @flow

import type { ChartFormat, ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';

import {
  defaultBarChartFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultLineChartFormat,
  defaultPieChartFormat,
} from './constants';

/**
 * @description Use chart format with default values for absent values.
 * @param {ChartType} kind
 * @param {ChartFormat} format
 * @returns {ChartFormat}
 */
export default function useChartFormatDefaults(
  kind: ChartType,
  format: ChartFormat
) {
  const defaultFormat = useAutoMemo(
    kind === chartTypes.BAR
      ? defaultBarChartFormat
      : kind === chartTypes.COLUMN
      ? defaultColumnChartFormat
      : kind === chartTypes.LINE
      ? defaultLineChartFormat
      : kind === chartTypes.PIE
      ? defaultPieChartFormat
      : defaultChartFormat
  );

  return useAutoMemo(
    Object.entries(defaultFormat).reduce(
      (acc, [key, value]) => (key in acc ? acc : { ...acc, [key]: value }),
      format
    )
  );
}

// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';

import { Item } from '../layout';

import BarChartContent from './BarChartContent';
import ColumnChartContent from './ColumnChartContent';
import LineChartContent from './LineChartContent';
import PieChartContent from './PieChartContent';
import type { ChartProps as Props } from './types';
import ChartSvg from './ChartSvg';
import ChartSvgDefs from './ChartSvgDefs';
import useChartFormat from './useChartFormat';

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({
  kind,
  onClick,
  className,
  ...initialChartProps
}: Props) {
  const chartProps = useChartFormat({ kind, ...initialChartProps });

  return kind === chartTypes.PIE ? (
    <PieChartContent {...chartProps} />
  ) : (
    <Item {...chartProps}>
      <ChartSvg {...chartProps}>
        <ChartSvgDefs />
        {kind === chartTypes.BAR ? (
          <BarChartContent {...chartProps} />
        ) : kind === chartTypes.COLUMN ? (
          <ColumnChartContent {...chartProps} />
        ) : kind === chartTypes.LINE ? (
          <LineChartContent {...chartProps} />
        ) : null}
      </ChartSvg>
    </Item>
  );
}

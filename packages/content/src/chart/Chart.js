// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';
import { useResizeTargetRef } from '@seine/styles';

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
  children,
  kind,
  onClick,
  className,
  ...initialChartProps
}: Props) {
  const chartProps = useChartFormat({ kind, ...initialChartProps });
  const resizeTargetRef = useResizeTargetRef();

  return (
    <Item {...chartProps} ref={resizeTargetRef}>
      {kind === chartTypes.PIE ? (
        <PieChartContent {...chartProps} />
      ) : (
        <ChartSvg {...chartProps} ref={resizeTargetRef}>
          <ChartSvgDefs />
          {kind === chartTypes.BAR ? (
            <BarChartContent {...chartProps} />
          ) : kind === chartTypes.COLUMN ? (
            <ColumnChartContent {...chartProps} />
          ) : kind === chartTypes.LINE ? (
            <LineChartContent {...chartProps} />
          ) : null}
        </ChartSvg>
      )}
    </Item>
  );
}

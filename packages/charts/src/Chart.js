// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';
import { useResizeTargetRef } from '@seine/styles';

import ChartLayout from './ChartLayout';
import BarChartContent from './BarChartContent';
import ColumnChartContent from './ColumnChartContent';
import LineChartContent from './LineChartContent';
import PieChartContent from './PieChartContent';
import type { ChartProps as Props } from './types';
import ChartSvg from './ChartSvg';
import ChartSvgDefs from './ChartSvgDefs';
import ColumnChartDescription from './ColumnChartDescription';
import LineChartDescription from './LineChartDescription';
import PieChartDescription from './PieChartDescription';
import BarChartDescription from './BarChartDescription';
import useChartFormatDefaults from './useChartFormatDefaults';

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({ children, kind, ...chartProps }: Props) {
  chartProps = useChartFormatDefaults(kind, chartProps);

  return (
    <ChartLayout
      ref={useResizeTargetRef()}
      title={chartProps.title}
      description={
        kind === chartTypes.BAR ? (
          <BarChartDescription {...chartProps} />
        ) : kind === chartTypes.COLUMN ? (
          <ColumnChartDescription {...chartProps} />
        ) : kind === chartTypes.LINE ? (
          <LineChartDescription {...chartProps} />
        ) : kind === chartTypes.PIE ? (
          <PieChartDescription {...chartProps} />
        ) : null
      }
      textAlignment={chartProps.textAlignment}
    >
      <ChartSvg>
        <ChartSvgDefs />
        {kind === chartTypes.BAR ? (
          <BarChartContent {...chartProps} />
        ) : kind === chartTypes.COLUMN ? (
          <ColumnChartContent {...chartProps} />
        ) : kind === chartTypes.LINE ? (
          <LineChartContent {...chartProps} />
        ) : kind === chartTypes.PIE ? (
          <PieChartContent {...chartProps} />
        ) : null}
      </ChartSvg>
      {children}
    </ChartLayout>
  );
}

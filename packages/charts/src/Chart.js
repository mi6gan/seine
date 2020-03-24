// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';

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
import useChartSvgProps from './useChartSvgProps';

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({ children, kind, ...initialChartProps }: Props) {
  initialChartProps = useChartFormatDefaults(kind, initialChartProps);
  const [chartProps, setChartProps] = React.useState(initialChartProps);
  const handleAutoFormat = useAutoCallback((format) =>
    setChartProps({ ...initialChartProps, ...format })
  );

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
      <ChartSvg {...useChartSvgProps(kind)}>
        <ChartSvgDefs />
        {kind === chartTypes.BAR ? (
          <BarChartContent {...chartProps} />
        ) : kind === chartTypes.COLUMN ? (
          <ColumnChartContent {...chartProps} />
        ) : kind === chartTypes.LINE ? (
          <LineChartContent {...chartProps} />
        ) : kind === chartTypes.PIE ? (
          <PieChartContent {...chartProps} onAutoFormat={handleAutoFormat} />
        ) : null}
      </ChartSvg>
      {children}
    </ChartLayout>
  );
}

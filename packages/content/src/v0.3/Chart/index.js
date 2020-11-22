// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useResizeTargetRef } from '../Page';

import ChartLayout from './ChartLayout';
import BarChartContent from './BarChartContent';
import ColumnChartContent from './ColumnChartContent';
import LineChartContent from './LineChartContent';
import PieChartContent from './PieChartContent';
import type { ChartProps as Props } from './types';
import ChartSvg from './ChartSvg';
import ChartSvgDefs from './ChartSvgDefs';
import ChartDescription from './ChartDescription';
import PieChartDescription from './PieChartDescription';
import useChartFormatDefaults from './useChartFormatDefaults';
import useChartSvgProps from './useChartSvgProps';

import { chartTypes } from '@seine/core';

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart_v0_3({
  children,
  kind,
  ...initialChartProps
}: Props) {
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
        kind === chartTypes.PIE ? (
          <PieChartDescription {...chartProps} />
        ) : (
          <ChartDescription {...chartProps} />
        )
      }
      textAlignment={chartProps.textAlignment}
      overflow={kind === chartTypes.PIE ? 'hidden' : 'visible'}
      height={chartProps.height}
    >
      <ChartSvg {...useChartSvgProps(kind, chartProps)}>
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

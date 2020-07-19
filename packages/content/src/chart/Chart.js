// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
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
  initialChartProps = useChartFormat({ kind, ...initialChartProps });
  const [chartProps, setChartProps] = React.useState(initialChartProps);
  const handleAutoFormat = useAutoCallback((format) =>
    setChartProps({ ...initialChartProps, ...format })
  );

  return (
    <Item {...chartProps}>
      <ChartSvg {...chartProps} ref={useResizeTargetRef()}>
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
    </Item>
  );
}

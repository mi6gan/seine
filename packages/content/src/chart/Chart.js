// @flow
import * as React from 'react';
import type { ChartBody, ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';

import { Item } from '../layout';

import BarChartContent from './BarChartContent';
import ColumnChartContent from './ColumnChartContent';
import LineChartContent from './LineChartContent';
import PieChart from './PieChart';
import ChartSvg from './ChartSvg';
import ChartSvgDefs from './ChartSvgDefs';
import useChartFormat from './useChartFormat';

type Props = $Shape<ChartFormat> & ChartBody & { parentType: string };

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart(props: Props) {
  const { kind, ...chartProps } = useChartFormat(props);

  return kind === chartTypes.PIE ? (
    <PieChart {...chartProps} />
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

// @flow
import * as React from 'react';
import type { ChartBody, ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';
import styled from 'styled-components/macro';

import { Item } from '../layout';

import BarChartContent from './BarChartContent';
import ColumnChartContent from './ColumnChartContent';
import LineChartContent from './LineChartContent';
import PieChart from './PieChart';
import ChartSvg from './ChartSvg';
import ChartSvgDefs from './ChartSvgDefs';
import useChartFormat from './useChartFormat';
import ChartLegend from './ChartLegend';
import { titleIdentityElements } from './helpers';

type Props = $Shape<ChartFormat> & ChartBody & { parentType: string };

const ChartItem = styled(Item)`
  display: flex;
  flex-direction: column;
`;

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart(props: Props) {
  const { kind, ...chartProps } = useChartFormat(props);

  return kind === chartTypes.PIE ? (
    <PieChart {...chartProps} as={ChartItem} />
  ) : (
    <ChartItem {...chartProps}>
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
      {!!chartProps.legend && (
        <ChartLegend
          elements={titleIdentityElements(chartProps.elements)}
          palette={chartProps.palette}
        />
      )}
    </ChartItem>
  );
}

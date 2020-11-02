// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Item } from '../layouts';

import LineChartContent from './LineChartContent';
import PieChart from './PieChart';
import ChartSvg from './ChartSvg';
import ChartSvgDefs from './ChartSvgDefs';
import useChartFormat from './useChartFormat';
import ChartLegend from './ChartLegend';
import { titleIdentityElements } from './helpers';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';

import type { ChartBody, ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';

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
  ) : kind === chartTypes.COLUMN ? (
    <ColumnChart {...chartProps} as={ChartItem} />
  ) : kind === chartTypes.BAR ? (
    <BarChart {...chartProps} as={ChartItem} />
  ) : (
    <ChartItem {...chartProps}>
      <ChartSvg {...chartProps}>
        <ChartSvgDefs />
        ) : kind === chartTypes.LINE ? (
        <LineChartContent {...chartProps} />) : null}
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

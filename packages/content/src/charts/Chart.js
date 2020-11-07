// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Item } from '../layouts';

import PieChart from './PieChart';
import useChartFormat from './useChartFormat';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

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
    <LineChart {...chartProps} as={ChartItem} />
  );
}

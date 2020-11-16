// @flow
import * as React from 'react';

import { Item } from '../layouts';

import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

import type { ChartBody, ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';

type Props = $Shape<ChartFormat> & ChartBody;

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({
  kind,
  as: ChartItem = Item,
  ...chartProps
}: Props) {
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

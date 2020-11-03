// @flow
import * as React from 'react';

import ColumnChart from './ColumnChart';

import {
  defaultChartDx,
  defaultChartFraction,
  defaultChartLegend,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartXAxis,
} from '@seine/content';
import type { BlockType, ChartElement } from '@seine/core';

type Props = {
  elements: ChartElement[],

  dx?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,

  parentType: BlockType,

  elementValueAs: React.ComponentType,
  groupTitleAs: React.ComponentType,
};

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChart({
  dx = defaultChartDx,
  legend = defaultChartLegend,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  xAxis = defaultChartXAxis,
  fraction = defaultChartFraction,
  minValue = defaultChartMinValue,
  ...barChartProps
}): Props {
  return (
    <ColumnChart
      {...barChartProps}
      rotated
      dx={dx}
      legend={legend}
      palette={palette}
      units={units}
      xAxis={xAxis}
      fraction={fraction}
      minValue={minValue}
    />
  );
}

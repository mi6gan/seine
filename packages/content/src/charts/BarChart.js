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
} from '@seine/core';
import type { ChartElement } from '@seine/core';

type Props = {
  elements: ChartElement[],

  dx?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,
};

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
const BarChart = React.forwardRef(function BarChart(
  {
    dx = defaultChartDx,
    legend = defaultChartLegend,
    palette = defaultChartPalette,
    units = defaultChartUnits,
    xAxis = defaultChartXAxis,
    fraction = defaultChartFraction,
    minValue = defaultChartMinValue,
    ...barChartProps
  },
  ref
): Props {
  return (
    <ColumnChart
      {...barChartProps}
      ref={ref}
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
});

export default BarChart;

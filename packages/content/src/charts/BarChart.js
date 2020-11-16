// @flow
import * as React from 'react';

import ColumnChart from './ColumnChart';

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
const BarChart = React.forwardRef(function BarChart(props, ref): Props {
  return <ColumnChart {...props} ref={ref} rotated />;
});

export default BarChart;

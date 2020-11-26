// @flow
import * as React from 'react';
import { Chart } from '@devexpress/dx-react-chart-material-ui';

import {
  defaultBarChartFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultItemFormat,
  defaultLineChartFormat,
  defaultPieChartFormat,
} from '@seine/core';

const formatKeys = Object.keys({
  ...defaultItemFormat,
  ...defaultChartFormat,
  ...defaultBarChartFormat,
  ...defaultColumnChartFormat,
  ...defaultPieChartFormat,
  ...defaultLineChartFormat,
});

// eslint-disable-next-line
const ChartBase = React.forwardRef((props, ref) => (
  <Chart
    ref={ref}
    {...Object.fromEntries(
      Object.entries(props).filter(([k]) => !formatKeys.includes(k))
    )}
  />
));

export default ChartBase;

// @flow
import * as React from 'react';
import { Chart } from '@devexpress/dx-react-chart-material-ui';

// eslint-disable-next-line
const ChartBase = React.forwardRef(({ className, data, children }, ref) => (
  <Chart className={className} data={data} ref={ref}>
    {children}
  </Chart>
));

export default ChartBase;

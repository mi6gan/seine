import * as React from 'react';

import { BarChart } from './Chart.stories';

export default { title: 'Constraints' };

export const BarChartOnSmallScreens = (props) => (
  <BarChart
    {...props}
    body={{
      elements: [
        {
          title: 'text size has limitation',
          value: 21,
          id: '8df0406e-473d-4956-a8d4-1e9c42c45cbf',
        },
        {
          title: 'depends on bar size',
          value: 20,
          id: 'e80e6d00-1e34-43b1-8b11-67a44bca921a',
        },
        {
          title: 'so value sets',
          value: 13,
          id: '23ec0b37-6da2-434c-8484-818f753deb63',
        },
        {
          title: 'actual limit',
          value: 12,
          id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
        },
        {
          title: 'of item',
          value: 8,
          id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
        },
      ],
    }}
    format={{ title: 'Not more than 5 items', dx: 3 }}
  />
);

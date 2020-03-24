import * as React from 'react';

import { BarChart, ColumnChart, PieChart } from './Chart.stories';

export default {
  title: 'Constraints',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

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
          title: 'of title',
          value: 8,
          id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
        },
      ],
    }}
    format={{ title: 'Five bar items', dx: 3 }}
  />
);

export const ColumnChartOfGroupsOnSmallScreens = (props) => (
  <ColumnChart
    {...props}
    body={{
      elements: [
        {
          id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
          title: '1-digit value only',
          group: 'Max. 5',
          value: 5,
        },
        {
          id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
          title: '5-symbol group or shorter',
          group: 'Max. 5',
          value: 6,
        },
        {
          id: '23ec0b37-6da2-434c-8484-818f753deb63',
          title: 'Any length legend labels',
          group: 'Max. 5',
          value: 1,
        },

        {
          id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
          title: '1-digit value only',
          group: 'Eg. 4',
          value: 0,
        },
        {
          id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
          title: '5-symbol group or shorter',
          group: 'Eg. 4',
          value: 7,
        },
        {
          id: '23ec0b37-6da2-434c-8484-818f753deb63',
          title: 'Any length legend labels',
          group: 'Eg. 4',
          value: 8,
        },

        {
          id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
          title: '1-digit value only',
          group: 'Never 7',
          value: 5,
        },
        {
          id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
          title: '5-symbol group or shorter',
          group: 'Never 7',
          value: 1,
        },
        {
          id: '23ec0b37-6da2-434c-8484-818f753deb63',
          title: 'Any length legend labels',
          group: 'Never 7',
          value: 9,
        },
      ],
    }}
    format={{ title: '3 of 3 groups', dy: 1 }}
  />
);

export const PieChartOnSmallScreens = (props) => (
  <PieChart
    {...props}
    body={{
      elements: [
        {
          id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
          title: 'use only 3-digit or smaller values',
          value: 260,
        },
        {
          id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
          title: 'legend is forced when some title do not fit in a slice',
          value: 642,
        },
        {
          id: '23ec0b37-6da2-434c-8484-818f753deb63',
          title: 'long titles are wrapped',
          value: 342,
        },
        {
          id: 'ee83f39d-03bc-4878-9c78-0edef43e936b',
          title: 'Slice titles may have any length',
          value: 523,
        },
      ],
    }}
    format={{ title: 'Each slice 15% minimum', units: ' ' }}
  />
);

// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { Legend } from '@devexpress/dx-react-chart';

import ChartLabel from './ChartLabel';

const LegendRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.typography.body1};
  margin-bottom: 0;
  && {
    padding: ${({ theme }) => theme.spacing(2, 0, 0, 0)};
  }
`;
const LegendItem = styled.div`
  height: 2.25em;
  width: auto;
  white-space: nowrap;
  display: flex;
  align-items: center;
  ${ChartLabel} {
    padding: ${({ theme }) => theme.spacing(0, 2)};

`;

export const LegendMarker = styled.svg.attrs([
  ({ color }) => ({
    fill: color,
    width: '1.5em',
    height: '1.5em',
  }),
  {
    children: <rect x={0} y={0} width={'100%'} height={'100%'} />,
  },
])``;

// eslint-disable-next-line
export default function ChartLegend({ labelComponent = ChartLabel }) {
  return (
    <Legend
      position={'bottom'}
      rootComponent={LegendRoot}
      markerComponent={LegendMarker}
      itemComponent={LegendItem}
      labelComponent={labelComponent}
    />
  );
}

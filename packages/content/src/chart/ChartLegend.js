// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { List } from '@material-ui/core';
import { Legend } from '@devexpress/dx-react-chart-material-ui';

const LegendRoot = styled(List)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .MuiListItem-root {
    width: auto;
  }
`;

const LegendMarker = ({ color }) => (
  <svg width={20} height={20} fill={color}>
    <rect x={0} y={0} width={'100%'} height={'100%'} />
  </svg>
);

// eslint-disable-next-line
export default function PieChartContent() {
  return (
    <Legend
      position={'bottom'}
      rootComponent={LegendRoot}
      markerComponent={LegendMarker}
    />
  );
}

// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { List } from '@material-ui/core';
import { Legend } from '@devexpress/dx-react-chart-material-ui';

const LegendRoot = styled(List)`
  display: flex;
  flex-wrap: wrap;
  && {
    padding: 0;
  }
  .MuiListItem-root {
    height: 2.25em;
    width: auto;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  .MuiListItemText-root {
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
  }
`;

export const LegendMarker = styled.svg.attrs([
  ({ color }) => ({ fill: color }),
  {
    width: 20,
    height: 20,
    children: <rect x={0} y={0} width={'100%'} height={'100%'} />,
  },
])``;

// eslint-disable-next-line
export default function PieChartLegend() {
  return (
    <Legend
      position={'bottom'}
      rootComponent={LegendRoot}
      markerComponent={LegendMarker}
    />
  );
}

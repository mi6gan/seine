// @flow
import {
  ArgumentAxis,
  Axis,
  BarSeries,
  Stack,
  ValueAxis,
} from '@devexpress/dx-react-chart';
import styled from 'styled-components/macro';
import * as React from 'react';

import { Item } from '../layouts';

import ChartBase from './ChartBase';
import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';

// eslint-disable-next-line
function ColumnChartPoint({ units, fraction, valueFieldsLength, ...props }) {
  const { arg, val, value, rotated } = props;
  const x = rotated ? val : arg;
  const y = rotated ? arg : val;
  return (
    <>
      <BarSeries.Point
        {...props}
        val={val + (rotated ? -14 : 10)}
        {...(!value && { startVal: 0 })}
      />
      <ChartLabel dominantBaseline={'middle'} textAnchor={'middle'} x={x} y={y}>
        <ChartValue fraction={fraction}>{value}</ChartValue>
        {units}
      </ChartLabel>
    </>
  );
}

// eslint-disable-next-line
const ChartAxisLine = styled(Axis.Line)`
  stroke: ${({ theme }) => theme.palette.text.secondary};
  shape-rendering: crispEdges;
`;

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
const ColumnChart = React.forwardRef(function ColumnChart(
  { legend, palette, paletteKey, xAxis, yAxis, valueFields, ...itemProps },
  ref
): Props {
  return (
    <Item forwardedAs={ChartBase} {...itemProps} ref={ref}>
      {!!xAxis && (
        <ArgumentAxis
          labelComponent={ChartLabel}
          lineComponent={ChartAxisLine}
        />
      )}
      {!!yAxis && <ValueAxis labelComponent={ChartLabel} showGrid={false} />}
      {valueFields.map((valueField, index) => (
        <BarSeries
          key={valueField}
          name={valueField}
          valueField={valueField}
          argumentField={'group'}
          color={palette[index % palette.length]}
          pointComponent={ColumnChartPoint}
          valueFieldsLength={valueFields.length}
        />
      ))}
      {!!legend && <ChartLegend />}
      <Stack />
    </Item>
  );
});

export default ColumnChart;

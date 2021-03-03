// @flow
import * as React from 'react';
import {
  ArgumentAxis,
  Axis,
  LineSeries,
  Stack,
  ValueAxis,
} from '@devexpress/dx-react-chart';
import styled from 'styled-components/macro';

import { Item } from '../layouts';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';
import ChartBase from './ChartBase';

import type { ChartElement } from '@seine/core';

type LineChartSeriesProps = LineSeries.SeriesProps;

// eslint-disable-next-line
function LineChartSeries({
  legend,
  fraction,
  maxTextLength = 15,
  ...props
}: LineChartSeriesProps) {
  const { color, coordinates, index } = props;
  return (
    <>
      <LineSeries.Path {...props} />
      {coordinates.map(
        ({
          arg,
          val,
          value,
          elementValueAs: ElementValue,
          index: seriesIndex,
          units,
        }) => (
          <React.Fragment key={seriesIndex}>
            <circle key={index} cx={arg} cy={val} r={3} fill={color} />
            <ChartLabel
              as={ElementValue}
              textAnchor={'middle'}
              x={arg}
              y={val - 6}
            >
              <ChartValue fraction={fraction}>{value}</ChartValue>
              {units}
            </ChartLabel>
          </React.Fragment>
        )
      )}
    </>
  );
}

type Props = {
  elements: ChartElement[],

  dx?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,
};

// eslint-disable-next-line
const ChartAxisLine = styled(Axis.Line)`
  stroke: ${({ theme }) => theme.palette.text.secondary};
  shape-rendering: crispEdges;
`;

// eslint-disable-next-line
const ChartGridLine = styled(Axis.Line)`
  stroke: ${({ theme }) => theme.palette.grey[200]};
  shape-rendering: crispEdges;
`;

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
const LineChart = React.forwardRef(function LineChart(
  {
    elements,
    xAxis,
    yAxis,
    palette,
    fraction,
    units,
    legend,
    titles,
    valueFields,
    header,
    rows,
    argumentAxisLabelAs: ArgumentAxisLabel = ChartLabel,
    legendLabelAs: LegendLabel = ChartLabel,
    ...itemProps
  },
  ref
): Props {
  return (
    <Item forwardedAs={ChartBase} {...itemProps} ref={ref}>
      {!!xAxis && (
        <ArgumentAxis
          labelComponent={ArgumentAxisLabel}
          lineComponent={ChartAxisLine}
        />
      )}

      {!!yAxis && (
        <ValueAxis
          labelComponent={ChartLabel}
          lineComponent={ChartAxisLine}
          gridComponent={ChartGridLine}
          showGrid
        />
      )}
      {valueFields.map((valueField, index) => (
        <LineSeries
          key={valueField}
          name={valueField}
          valueField={valueField}
          argumentField={'group'}
          color={palette[index % palette.length]}
          seriesComponent={LineChartSeries}
          valueFieldsLength={valueFields.length}
          fraction={fraction}
          units={units}
          header={header}
        />
      ))}
      {!!legend && <ChartLegend labelComponent={LegendLabel} />}
      <Stack />
    </Item>
  );
});

export default LineChart;

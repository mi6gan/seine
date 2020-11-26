// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import { Stack } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  Chart,
  LineSeries,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { LineChartItem } from '../layouts/Item';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';

import type { ChartElement } from '@seine/core';
import { defaultLineChartFormat } from '@seine/core';

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
function ArgumentAxisLine({ y1, y2, ...props }) {
  return <ArgumentAxis.Line y1={y1} y2={y2} {...props} />;
}

// eslint-disable-next-line
function ValueLabel({ text, ...props }) {
  return text !== 'null' && <ChartLabel {...props}>{text}</ChartLabel>;
}

// eslint-disable-next-line
function LineChartBase(props) {
  return (
    <Chart
      {...Object.fromEntries(
        Object.entries(props).filter(([k]) => !(k in defaultLineChartFormat))
      )}
    />
  );
}

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
const LineChart = React.forwardRef(function LineChart(
  { elements, xAxis, yAxis, palette, fraction, units, legend, ...itemProps },
  ref
): Props {
  const data = useAutoMemo(
    Object.entries(
      elements.reduce(
        (acc, { group = null, title, value }) => ({
          ...acc,
          [group]: { ...acc[group], [title]: value },
        }),
        {}
      )
    ).map(([group, values]) => ({ ...values, group }))
  );

  const newValueFields = useAutoMemo(() => {
    const valueFieldsSet = new Set();
    data.forEach(({ group, ...values }) => {
      Object.keys(values).forEach((valueField) => {
        valueFieldsSet.add(valueField);
      });
    });
    return [...valueFieldsSet];
  });
  const [valueFields, setValueFields] = React.useState(newValueFields);
  const forceRemount = valueFields.length !== newValueFields.length;

  useAutoEffect(() => {
    setValueFields(newValueFields);
  });

  const ArgumentAxisLabel = useAutoCallback(({ text, ...props }) => (
    <ValueLabel {...props} text={text} meta={text} />
  ));

  return forceRemount ? null : (
    <LineChartItem
      {...itemProps}
      ref={ref}
      forwardedAs={LineChartBase}
      data={data}
    >
      {!!xAxis && (
        <ArgumentAxis
          labelComponent={ArgumentAxisLabel}
          lineComponent={ArgumentAxisLine}
        />
      )}

      {!!yAxis && <ValueAxis labelComponent={ValueLabel} showGrid />}
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
        />
      ))}
      {!!legend && <ChartLegend />}
      <Stack />
    </LineChartItem>
  );
});

export default LineChart;

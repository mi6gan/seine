// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import { Stack } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import styled from 'styled-components/macro';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartItem from './ChartItem';
import ChartLegend from './ChartLegend';

import type { ChartElement } from '@seine/core';

const ColumnChartItem = styled(ChartItem)`
  && {
    padding: ${({ theme }) => theme.spacing(4, 2, 0)};
  }
`;

// eslint-disable-next-line
function ColumnChartPoint({ units, fraction, valueFieldsLength, ...props }) {
  const { arg, val, value, rotated } = props;
  const x = rotated ? val : arg;
  const y = rotated ? arg : val;
  return (
    <>
      <BarSeries.Point {...props} val={val + (rotated ? -14 : 10)} />
      {(value || rotated) && (
        <ChartLabel
          dominantBaseline={'middle'}
          textAnchor={'middle'}
          x={x}
          y={y}
        >
          <ChartValue fraction={fraction}>{value}</ChartValue>
          {units}
        </ChartLabel>
      )}
    </>
  );
}

// eslint-disable-next-line
function ArgumentAxisLine({ y1, y2, ...props }) {
  return <ArgumentAxis.Line y1={y1} y2={y2} {...props} />;
}

// eslint-disable-next-line
function ValueLabel({ text, ...props }) {
  return text !== 'null' && <ChartLabel {...props}>{text}</ChartLabel>;
}

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
  { elements, legend, palette, paletteKey, xAxis, yAxis, ...itemProps },
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
    <ColumnChartItem forwardedAs={Chart} data={data} {...itemProps} ref={ref}>
      {!!xAxis && (
        <ArgumentAxis
          labelComponent={ArgumentAxisLabel}
          lineComponent={ArgumentAxisLine}
        />
      )}

      {!!yAxis && <ValueAxis labelComponent={ValueLabel} showGrid={false} />}
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
    </ColumnChartItem>
  );
});

export default ColumnChart;

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

import {
  defaultChartDx,
  defaultChartFraction,
  defaultChartLegend,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartXAxis,
} from '@seine/content';
import { SvgTypography } from '@seine/styles';
import type { BlockType, ChartElement } from '@seine/core';

const ColumnChartItem = styled(ChartItem)`
  && {
    padding: ${({ theme }) => theme.spacing(4, 2, 0)};
  }
`;

// eslint-disable-next-line
function ColumnChartPoint({ units, fraction, valueFieldsLength, ...props }) {
  const { arg, val, value, seriesIndex, index, rotated } = props;
  const x = rotated ? val : arg;
  const y = rotated ? arg : val;
  return (
    <>
      <BarSeries.Point {...props} val={val + (rotated ? -14 : 10)} />
      <ChartLabel
        as={SvgTypography}
        dominantBaseline={'middle'}
        textAnchor={'middle'}
        meta={{ value, index: index * valueFieldsLength + seriesIndex }}
        x={x}
        y={y}
      >
        <ChartValue fraction={fraction}>{value}</ChartValue>
        {units}
      </ChartLabel>
    </>
  );
}

// eslint-disable-next-line
function ArgumentAxisLine({ y1, y2, ...props }) {
  return <ArgumentAxis.Line y1={y1 - 14} y2={y2 - 14} {...props} />;
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

  parentType: BlockType,
};

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
const ColumnChart = React.forwardRef(function ColumnChart(
  {
    elements,

    dx = defaultChartDx,
    legend = defaultChartLegend,
    palette = defaultChartPalette,
    units = defaultChartUnits,
    xAxis = defaultChartXAxis,
    fraction = defaultChartFraction,
    minValue: initialMinValue = defaultChartMinValue,
    maxValue: initialMaxValue,

    dy,

    paletteKey,
    yAxis,
    textAlignment,
    parentType,

    ...itemProps
  },
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
    <ValueLabel {...props} as={SvgTypography} text={text} meta={text} />
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

// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import { Stack } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  Chart,
  LineSeries,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import ChartLabel from './ChartLabel';
import ChartItem from './ChartItem';
import ChartValue from './ChartValue';
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

type LineChartSeriesProps = LineSeries.SeriesProps & {
  elementValueAs: (Chart.LabelProps) => React.Node,
  groupTitleAs: (Chart.LabelProps) => React.Node,
};

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

  parentType: BlockType,

  elementValueAs?: React.ComponentType,
  groupTitleAs?: React.ComponentType,
};

// eslint-disable-next-line
function ArgumentAxisLine({ y1, y2, ...props }) {
  return <ArgumentAxis.Line y1={y1 - 14} y2={y2 - 14} {...props} />;
}

// eslint-disable-next-line
function ValueLabel({ text, ...props }) {
  return text !== 'null' && <ChartLabel {...props}>{text}</ChartLabel>;
}

const LineChartItem = styled(ChartItem)`
  && {
    padding: ${({ theme }) => theme.spacing(4, 2, 0)};
  }
`;

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
const LineChart = React.forwardRef(function LineChart(
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

    groupTitleAs: GroupTitle = SvgTypography,

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
    <ValueLabel {...props} as={GroupTitle} text={text} meta={text} />
  ));

  return forceRemount ? null : (
    <LineChartItem forwardedAs={Chart} data={data} {...itemProps} ref={ref}>
      {!!xAxis && (
        <ArgumentAxis
          labelComponent={ArgumentAxisLabel}
          lineComponent={ArgumentAxisLine}
        />
      )}

      {!!yAxis && (
        <ValueAxis labelComponent={ValueLabel} showGrid tickSize={dy} />
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
        />
      ))}
      {!!legend && <ChartLegend />}
      <Stack />
    </LineChartItem>
  );
});

export default LineChart;

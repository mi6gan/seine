// @flow
import * as React from 'react';
import { useAutoMemo, useAutoCallback } from 'hooks.macro';
import { Stack } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Item } from '../layouts';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';

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

type Props = {
  elements: ChartElement[],

  dx?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,

  parentType: BlockType,

  elementValueAs: React.ComponentType,
  groupTitleAs: React.ComponentType,
};

// eslint-disable-next-line
function BarLabel({
  units,
  fraction,
  elementValueAs: ElementValue,
  valueFieldsLength,
  ...props
}) {
  const { arg, val, value, seriesIndex, index } = props;
  return (
    <>
      <BarSeries.Point {...props} val={val + 10} />
      <ChartLabel
        as={ElementValue}
        textAnchor={'middle'}
        x={arg}
        y={val + 8}
        meta={{ value, index: index * valueFieldsLength + seriesIndex }}
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
  return <ChartLabel {...props}>{text}</ChartLabel>;
}

/**
 * @description Bar chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChart({
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

  elementValueAs: ElementValue = SvgTypography,
  groupTitleAs: GroupTitle = SvgTypography,

  parentType,

  ...itemProps
}): Props {
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

  const valueFields = useAutoMemo(() => {
    const valueFieldsSet = new Set();
    data.forEach(({ group, ...values }) => {
      Object.keys(values).forEach((valueField) => {
        valueFieldsSet.add(valueField);
      });
    });
    return [...valueFieldsSet];
  });

  const ArgumentAxisLabel = useAutoCallback(({ text, ...props }) => (
    <ValueLabel {...props} as={GroupTitle} text={text} meta={text} />
  ));

  return (
    <Item forwardedAs={Chart} data={data} {...itemProps}>
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
          pointComponent={BarLabel}
          elementValueAs={ElementValue}
          valueFieldsLength={valueFields.length}
        />
      ))}
      <Stack />
    </Item>
  );
}

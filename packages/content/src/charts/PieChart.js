// @flow
import * as React from 'react';
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import { useAutoMemo } from 'hooks.macro';

import {
  defaultChartFraction,
  defaultChartPalette,
  defaultPieChartLegend,
  defaultPieChartUnits,
} from './constants';
import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import PieChartLegend from './PieChartLegend';
import ChartItem from './ChartItem';

import type { ChartElement } from '@seine/core';

type Props = {
  elements: ChartElement[],

  palette?: string[],
  units?: string,

  elementTitleAs?: React.ElementType,
  elementValueAs?: React.ElementType,
};

// eslint-disable-next-line
function PieLabel({
  units,
  legend,
  fraction,
  maxTextLength = 15,
  elementTitleAs: ElementTitle,
  elementValueAs: ElementValue,
  ...props
}) {
  const {
    argument,
    value,
    arg,
    val,
    maxRadius,
    startAngle,
    endAngle,
    index,
  } = props;
  const { x, y } = useAutoMemo(() => {
    const angle = startAngle + (endAngle - startAngle) / 2;
    const radius = maxRadius / 2;
    return {
      x: radius * Math.sin(angle),
      y: radius * Math.cos(angle),
    };
  });

  return (
    <>
      <PieSeries.Point {...props} />
      <ChartLabel
        as={ElementValue}
        textAnchor={'middle'}
        dominantBaseline={legend ? 'middle' : 'baseline'}
        variant={'h5'}
        fontWeight={400}
        x={arg + x}
        y={val - y}
        color={'common.white'}
        meta={{ value, index }}
      >
        <ChartValue fraction={fraction}>{value}</ChartValue>
        {units}
      </ChartLabel>
      <ChartLabel
        as={ElementTitle}
        textAnchor={'middle'}
        dominantBaseline={'hanging'}
        variant={'caption'}
        x={arg + x}
        y={val - y}
        color={'common.white'}
        meta={{ title: argument, index }}
      >
        {argument}
      </ChartLabel>
    </>
  );
}

/**
 * @description Pie chart block renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
const PieChart = React.forwardRef(function PieChart(
  {
    legend = defaultPieChartLegend,
    palette = defaultChartPalette,
    units = defaultPieChartUnits,
    fraction = defaultChartFraction,

    elements,
    elementTitleAs = ChartLabel,
    elementValueAs = ChartLabel,

    dx,
    dy,
    title,
    minValue,
    maxValue,
    paletteKey,
    xAxis,
    yAxis,

    children,

    ...itemProps
  },
  ref
): Props {
  return (
    <ChartItem ref={ref} forwardedAs={Chart} data={elements} {...itemProps}>
      <Palette scheme={palette} />
      <PieSeries
        name={'slices'}
        valueField={'value'}
        argumentField={'title'}
        legend={legend}
        units={units}
        fraction={fraction}
        pointComponent={PieLabel}
        elementTitleAs={elementTitleAs}
        elementValueAs={elementValueAs}
      />
      {!!legend && <PieChartLegend />}
    </ChartItem>
  );
});

export default PieChart;

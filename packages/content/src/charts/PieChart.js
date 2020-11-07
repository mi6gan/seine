// @flow
import * as React from 'react';
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import {
  defaultChartFraction,
  defaultChartPalette,
  defaultPieChartLegend,
  defaultPieChartUnits,
} from './constants';
import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';
import ChartItem from './ChartItem';

import type { ChartBody, ChartElement, ChartFormat } from '@seine/core';
import { ItemProps } from '@seine/content';

const PieChartItem = styled(ChartItem)`
  && {
    padding: ${({ theme }) => theme.spacing(4, 2, 0)};
  }
`;

type PieChartPointProps = {
  elements: ChartElement[],

  palette?: string[],
  units?: string,

  elementTitleAs?: React.ElementType,
  elementValueAs?: React.ElementType,
};

// eslint-disable-next-line
function PieChartPoint({
  units,
  legend,
  fraction,
  maxTextLength = 15,
  elementTitleAs: ElementTitle,
  elementValueAs: ElementValue,
  ...props
}: PieChartPointProps) {
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

type Props = ItemProps & ChartBody & $Shape<ChartFormat>;

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
    <PieChartItem ref={ref} forwardedAs={Chart} data={elements} {...itemProps}>
      <Palette scheme={palette} />
      <PieSeries
        name={'slices'}
        valueField={'value'}
        argumentField={'title'}
        legend={legend}
        units={units}
        fraction={fraction}
        pointComponent={PieChartPoint}
        elementTitleAs={elementTitleAs}
        elementValueAs={elementValueAs}
      />
      {!!legend && <ChartLegend />}
    </PieChartItem>
  );
});

export default PieChart;

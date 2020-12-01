// @flow
import * as React from 'react';
import { Palette, PieSeries } from '@devexpress/dx-react-chart';
import { useAutoMemo } from 'hooks.macro';

import type { ItemProps } from '../layouts';
import { Item } from '../layouts';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';
import ChartBase from './ChartBase';

import type { ChartBody, ChartElement, ChartFormat } from '@seine/core';

type PieChartPointProps = {
  elements: ChartElement[],

  palette?: string[],
  units?: string,
};

// eslint-disable-next-line
function PieChartPoint({
  units,
  legend,
  fraction,
  maxTextLength = 15,
  pane,
  ...props
}: PieChartPointProps) {
  const { argument, value, arg, val, maxRadius, startAngle, endAngle } = props;
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
        textAnchor={'middle'}
        dominantBaseline={legend ? 'middle' : 'baseline'}
        variant={'body1'}
        fontWeight={400}
        x={arg + x}
        y={val - y}
        color={'common.white'}
      >
        <ChartValue fraction={fraction}>{value}</ChartValue>
        {units}
      </ChartLabel>
      {!legend && (
        <ChartLabel
          textAnchor={'middle'}
          dominantBaseline={'hanging'}
          variant={'body2'}
          x={arg + x}
          y={val - y}
          color={'common.white'}
          width={pane.width / 5}
        >
          {argument}
        </ChartLabel>
      )}
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
  { legend, palette, units, fraction, elements, ...itemProps },
  ref
): Props {
  return (
    <Item ref={ref} forwardedAs={ChartBase} data={elements} {...itemProps}>
      <Palette scheme={palette} />
      <PieSeries
        name={'slices'}
        valueField={'value'}
        argumentField={'title'}
        legend={legend}
        units={units}
        fraction={fraction}
        pointComponent={PieChartPoint}
      />
      {!!legend && <ChartLegend />}
    </Item>
  );
});

export default PieChart;

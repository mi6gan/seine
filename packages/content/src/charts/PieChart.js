// @flow
import * as React from 'react';
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import { useAutoMemo } from 'hooks.macro';

import type { ItemProps } from '../layouts';
import { PieChartItem } from '../layouts';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';

import type { ChartBody, ChartElement, ChartFormat } from '@seine/core';
import { defaultPieChartFormat } from '@seine/core';

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

// eslint-disable-next-line
function PieChartBase(props) {
  return (
    <Chart
      {...Object.fromEntries(
        Object.entries(props).filter(([k]) => !(k in defaultPieChartFormat))
      )}
    />
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
    <PieChartItem
      ref={ref}
      forwardedAs={PieChartBase}
      data={elements}
      {...itemProps}
    >
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
    </PieChartItem>
  );
});

export default PieChart;

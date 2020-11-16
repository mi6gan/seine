// @flow
import * as React from 'react';
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import type { ItemProps } from '../layouts';

import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';
import ChartLegend from './ChartLegend';
import ChartItem from './ChartItem';

import type { ChartBody, ChartElement, ChartFormat } from '@seine/core';
import { SvgTypography } from '@seine/styles';

const PieChartItem = styled(ChartItem)`
  && {
    padding: ${({ theme }) => theme.spacing(4, 2, 0)};
  }
`;

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
        as={SvgTypography}
        textAnchor={'middle'}
        dominantBaseline={legend ? 'middle' : 'baseline'}
        variant={'h5'}
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
          as={SvgTypography}
          textAnchor={'middle'}
          dominantBaseline={'hanging'}
          variant={'body2'}
          x={arg + x}
          y={val - y}
          color={'common.white'}
          width={pane.width / 5}
          whiteSpace={'pre-wrap'}
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
      />
      {!!legend && <ChartLegend />}
    </PieChartItem>
  );
});

export default PieChart;

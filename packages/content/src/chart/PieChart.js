// @flow
import * as React from 'react';
import type { ChartElement } from '@seine/core';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import styled from 'styled-components/macro';
import { Palette } from '@devexpress/dx-react-chart';
import { useAutoMemo } from 'hooks.macro';

import Item from '../layout/Item';

import {
  defaultChartFraction,
  defaultChartPalette,
  defaultPieChartLegend,
  defaultPieChartUnits,
} from './constants';
import PieChartLegend from './PieChartLegend';
import ChartLabel from './ChartLabel';
import ChartValue from './ChartValue';

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

const StyledTitle = styled(Title).attrs(
  ({ text: children, variant = 'h4' }) => ({
    children,
    variant,
  })
)`
  ${({
    variant,
    theme: {
      typography: {
        fontWeightLight,
        [variant]: { fontWeight: defaultFontWeight = fontWeightLight, ...font },
      },
    },
    fontWeight = defaultFontWeight,
  }) => ({ ...font, fontWeight })};
`;

/**
 * @description Pie chart block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function PieChart({
  as: Container = Item,

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
}): Props {
  return (
    <Container as={Chart} data={elements} {...itemProps}>
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
      <StyledTitle text={title} />
    </Container>
  );
}

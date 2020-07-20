// @flow
import * as React from 'react';
import type { ChartElement } from '@seine/core';
import {
  Chart,
  Legend,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import styled from 'styled-components/macro';
import { List } from '@material-ui/core';
import { Palette } from '@devexpress/dx-react-chart';
import { useResizeTargetRef } from '@seine/styles';

import Item from '../layout/Item';

import {
  defaultChartFraction,
  defaultChartPalette,
  defaultPieChartLegend,
  defaultPieChartUnits,
} from './constants';

type Props = {
  autoFormat: boolean,
  elements: ChartElement[],

  palette?: string[],
  units?: string,

  elementPathAs?: React.ElementType,
  elementTitleAs?: React.ElementType,
  elementValueAs?: React.ElementType,

  onAutoFormat?: ($Shape<Props>) => any,
};

const Text = styled(Chart.Label).attrs(({ variant = 'body1' }) => ({
  variant,
}))`
  && {
    ${({
      variant,
      theme: {
        typography: {
          fontWeightLight,
          [variant]: {
            fontWeight: defaultFontWeight = fontWeightLight,
            ...font
          },
        },
      },
      fontWeight = defaultFontWeight,
    }) => ({ ...font, fontWeight })};
    fill: currentColor;
  }
`;

const LegendRoot = styled(List)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .MuiListItem-root {
    width: auto;
  }
`;

// eslint-disable-next-line
function LegendMarker({ color }) {
  return (
    <svg width={20} height={20} fill={color}>
      <rect x={0} y={0} width={'100%'} height={'100%'} />
    </svg>
  );
}

// eslint-disable-next-line
function PieLabel({
  units,
  legend,
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
  const angle = startAngle + (endAngle - startAngle) / 2;

  const x = ((2 * maxRadius) / 3) * Math.sin(angle);
  const y = ((2 * maxRadius) / 3) * Math.cos(angle);

  return (
    <>
      <PieSeries.Point {...props} />
      <ElementValue
        textAnchor={'middle'}
        dominantBaseline={legend ? 'middle' : 'baseline'}
        variant={'h5'}
        fontWeight={400}
        x={arg + x}
        y={val - y}
        meta={{ value, index }}
      >
        {value}
        {units}
      </ElementValue>
      {!legend && (
        <ElementTitle
          textAnchor={'middle'}
          dominantBaseline={'hanging'}
          variant={'caption'}
          x={arg + x}
          y={val - y}
          meta={{ title: argument, index }}
        >
          {argument.slice(0, maxTextLength)}
          {maxTextLength < argument.length && '...'}
        </ElementTitle>
      )}
    </>
  );
}

const StyledTitle = styled.div.attrs(({ text: children, variant = 'h4' }) => ({
  children,
  variant,
}))`
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
  fill: currentColor;
`;

/**
 * @description Pie chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function PieChartContent({
  as: Container = Item,
  legend = defaultPieChartLegend,
  palette = defaultChartPalette,
  units = defaultPieChartUnits,
  fraction = defaultChartFraction,
  dx,
  dy,
  elements,
  title,
  minValue,
  maxValue,
  paletteKey,
  xAxis,
  yAxis,
  elementTitleAs = Text,
  elementValueAs = Text,
  ...itemProps
}): Props {
  return (
    <Container
      as={Chart}
      {...itemProps}
      data={elements}
      forwardRef={useResizeTargetRef()}
    >
      <Palette scheme={palette} />
      <PieSeries
        name={'slices'}
        valueField={'value'}
        argumentField={'title'}
        legend={legend}
        units={units}
        pointComponent={PieLabel}
        elementTitleAs={elementTitleAs}
        elementValueAs={elementValueAs}
      />
      {!!legend && (
        <Legend
          position={'bottom'}
          rootComponent={LegendRoot}
          markerComponent={LegendMarker}
        />
      )}
      <Title text={title} textComponent={StyledTitle} />
    </Container>
  );
}

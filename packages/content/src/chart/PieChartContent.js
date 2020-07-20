// @flow
import * as React from 'react';
import type { ChartElement } from '@seine/core';
import {
  Chart,
  Legend,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Palette } from '@devexpress/dx-react-chart';
import styled from 'styled-components/macro';
import { List } from '@material-ui/core';
import { useAutoMemo } from 'hooks.macro';

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

const Text = styled.text.attrs(({ variant = 'body1' }) => ({ variant }))`
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
function PieLabel({ units, legend, ...props }) {
  const {
    index,
    argument,
    value,
    arg,
    val,
    maxRadius,
    startAngle,
    endAngle,
    maxTextLength = 15,
  } = props;
  const x =
    (maxRadius * Math.cos(startAngle + (endAngle - startAngle) / 2)) / 2;
  const y =
    (-maxRadius * Math.sin(startAngle + (endAngle - startAngle) / 2)) / 2;

  return (
    <>
      <defs>
        <g id={`sliceText${index}`} transform={`translate(${arg} ${val})`}>
          <Text
            textAnchor={'middle'}
            dominantBaseline={'baseline'}
            variant={'h5'}
            fontWeight={400}
            y={y}
            x={x}
          >
            {value}
            {units}
          </Text>
          {!legend && (
            <Text
              textAnchor={'middle'}
              dominantBaseline={'hanging'}
              variant={'caption'}
              y={y}
              x={x}
            >
              {argument.slice(0, maxTextLength)}
              {maxTextLength < argument.length && '...'}
            </Text>
          )}
        </g>
      </defs>
      <PieSeries.Point {...props} />
      {useAutoMemo(
        startAngle > Math.PI ? Array.from({ length: index + 1 }) : []
      ).map((_, index) => (
        <use href={`#sliceText${index}`} key={index} />
      ))}
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
  elements,
  palette,
  units,
  legend,
  title,
  as: Container = Chart,
}): Props {
  return (
    <Container data={elements}>
      <Palette scheme={palette} />
      <Title text={title} textComponent={StyledTitle} />
      <PieSeries
        valueField={'value'}
        argumentField={'title'}
        legend={legend}
        units={units}
        pointComponent={PieLabel}
      />
      {!!legend && (
        <Legend
          position={'bottom'}
          rootComponent={LegendRoot}
          markerComponent={LegendMarker}
        />
      )}
    </Container>
  );
}

// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { BlockType, ChartElement } from '@seine/core';
import invert from 'invert-color';

import {
  defaultBarChartLegend,
  defaultChartDx,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartXAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import ChartXAxis from './ChartXAxis';

type Props = {
  elements: ChartElement[],

  dx?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,

  parentType: BlockType,

  elementTitleAs: React.ComponentType,
  elementValueAs: React.ComponentType,
  elementRectAs: React.ComponentType,

  parentType: BlockType,
};

const MIN_BAR_WIDTH = VIEWPORT_WIDTH / 2;

/**
 * @description Bar chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function BarChartContent({
  elements,

  dx = defaultChartDx,
  legend = defaultBarChartLegend,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  xAxis = defaultChartXAxis,

  dy,
  minValue,
  maxValue = elements.reduce(
    (max, { value }) => Math.max(+value, max),
    -Infinity
  ),

  paletteKey,
  yAxis,
  textAlignment,

  parentType,

  elementTitleAs: ElementTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,
  elementRectAs: ElementRect = 'rect',

  ...metaProps
}: Props) {
  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const titleWidth = legend ? 0 : titleMethods.getScaledWidth();
  const titleHeight = titleMethods.getScaledHeight();

  const [
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const valueWidth = valueMethods.getScaledWidth();
  const valueHeight = valueMethods.getScaledHeight();

  const barHeight = titleHeight;
  const height =
    parentType === 'grid'
      ? VIEWPORT_HEIGHT
      : barHeight * elements.length + valueHeight;

  const paddedBarWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);
  const barWidth =
    paddedBarWidth > MIN_BAR_WIDTH ? paddedBarWidth : VIEWPORT_WIDTH;

  return (
    <g strokeWidth={titleHeight / 40}>
      {elements.map(({ title, value }, index) => {
        const width = (barWidth * value) / maxValue;
        const color = palette[index % palette.length];
        const rgb = color.startsWith('rgb') && color.match(/\d+/g);
        const textColor =
          barWidth === paddedBarWidth
            ? color
            : invert(rgb ? rgb.slice(0, 3) : color, { threshold: 0.5 });
        const y = height - valueHeight - barHeight * (elements.length - index);
        const meta = { ...elements[index], index };

        return [
          <ElementRect
            {...metaProps}
            fill={color}
            height={barHeight}
            width={width}
            key={`selection.${index}`}
            meta={meta}
            x={barWidth === paddedBarWidth ? titleWidth : 0}
            y={y}
          />,
          <ElementTitle
            {...metaProps}
            dominantBaseline={'middle'}
            fill={textColor}
            ref={titleTypographyMethodsRef}
            key={`title.${index}`}
            meta={meta}
            x={0}
            y={y + barHeight / 2}
          >
            {' '}
            {legend ? '' : title}{' '}
          </ElementTitle>,

          <ElementValue
            {...metaProps}
            dominantBaseline={'middle'}
            ref={valueTypographyMethodsRef}
            {...(barWidth !== paddedBarWidth && { fill: textColor })}
            key={`value.${index}`}
            meta={meta}
            textAnchor={barWidth === paddedBarWidth ? 'start' : 'end'}
            x={barWidth === paddedBarWidth ? titleWidth + width : width}
            y={y + barHeight / 2}
          >
            {' '}
            {value}
            {units}{' '}
          </ElementValue>,
        ];
      })}
      {!!xAxis && (
        <ChartXAxis
          length={barWidth}
          max={maxValue}
          step={dx}
          units={units}
          x={barWidth === paddedBarWidth ? titleWidth : 0}
          y={height - valueHeight}
        />
      )}
    </g>
  );
}

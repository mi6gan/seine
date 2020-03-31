// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { BlockType, ChartElement } from '@seine/core';
import invert from 'invert-color';

import {
  defaultChartDx,
  defaultChartFraction,
  defaultChartLegend,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartXAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import ChartXAxis from './ChartXAxis';
import ChartValue from './ChartValue';
import { useGroupedElements } from './helpers';

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
  groupTitleAs: React.ComponentType,

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

  elementTitleAs: ElementTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,
  elementRectAs: ElementRect = 'rect',
  groupTitleAs: GroupTitle = SvgTypography,

  parentType,

  ...metaProps
}: Props) {
  const [maxValue, minValue, titledElements, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [
    groupMethods,
    groupTypographyMethodsRef,
  ] = useTypographyChildrenMethods(groups.length);
  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(titledElements.length);
  const titleWidth = Math.max(
    groupMethods.getScaledWidth(),
    titleMethods.getScaledWidth()
  );
  const titleHeight = Math.max(
    groupMethods.getScaledHeight(),
    titleMethods.getScaledHeight()
  );

  const [
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(titledElements.length);
  const valueWidth = valueMethods.getScaledWidth();
  const valueHeight = valueMethods.getScaledHeight();

  const barHeight = Math.max(
    titleHeight,
    (VIEWPORT_HEIGHT - valueHeight * groups.length) /
      Math.max(elements.length, 5)
  );
  const groupHeight =
    parentType === 'grid'
      ? VIEWPORT_HEIGHT / groups.length
      : (barHeight * elements.length) / groups.length + valueHeight;

  const paddedBarWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);
  const barWidth =
    paddedBarWidth > MIN_BAR_WIDTH ? paddedBarWidth : VIEWPORT_WIDTH;
  return [
    ...groups.map(([group, groupElements], groupIndex) => {
      return (
        <g strokeWidth={titleHeight / 40} key={groupIndex}>
          {groupElements.map(({ title, value }, index) => {
            value = Math.min(Math.max(value, minValue), maxValue);

            const width = minValue + (barWidth * value) / (maxValue - minValue);
            const color = palette[index % palette.length];
            const rgb = color.startsWith('rgb') && color.match(/\d+/g);
            const textColor =
              barWidth === paddedBarWidth
                ? color
                : invert(rgb ? rgb.slice(0, 3) : color, { threshold: 0.5 });
            const y =
              groupHeight * (groupIndex + 1) -
              valueHeight -
              barHeight * (groupElements.length - index);
            const meta = { ...groupElements[index], index };

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
                fill={legend ? 'transparent' : textColor}
                ref={titleTypographyMethodsRef}
                key={`title.${index}`}
                meta={groupElements[index]}
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
                meta={groupElements[index]}
                textAnchor={barWidth === paddedBarWidth ? 'start' : 'end'}
                x={barWidth === paddedBarWidth ? titleWidth + width : width}
                y={y + barHeight / 2}
              >
                {' '}
                <ChartValue fraction={fraction}>{value}</ChartValue>
                {units}{' '}
              </ElementValue>,
            ];
          })}
          <GroupTitle
            {...metaProps}
            fontWeight={600}
            ref={groupTypographyMethodsRef}
            meta={group}
            x={0}
            y={groupHeight * groupIndex + groupHeight / 2}
          >
            {' '}
            {legend ? group : ''}{' '}
          </GroupTitle>
        </g>
      );
    }),
    !!xAxis && (
      <g key={'axis'} strokeWidth={titleHeight / 40}>
        <ChartXAxis
          length={barWidth}
          max={maxValue}
          step={dx}
          units={units}
          x={barWidth === paddedBarWidth ? titleWidth : 0}
          y={groupHeight * groups.length - valueHeight}
        />
      </g>
    ),
  ];
}

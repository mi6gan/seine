// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { BlockType, ChartElement } from '@seine/core';
import invert from 'invert-color';
import { useAutoMemo } from 'hooks.macro';

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
  ] = useTypographyChildrenMethods(titledElements.length * groups.length);

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
  ] = useTypographyChildrenMethods(titledElements.length * groups.length);
  const valueWidth = valueMethods.getScaledWidth();
  const valueHeight = valueMethods.getScaledHeight();

  const barHeight = Math.max(valueHeight, titleHeight);
  const paddedBarWidth = VIEWPORT_WIDTH - (titleWidth + valueWidth);
  const barWidth =
    legend || paddedBarWidth > MIN_BAR_WIDTH ? paddedBarWidth : VIEWPORT_WIDTH;

  const groupHeight = useAutoMemo(
    parentType === 'grid'
      ? VIEWPORT_HEIGHT / groups.length
      : (barHeight * elements.length) / groups.length + barHeight
  );

  return (
    <g strokeWidth={titleHeight / 40}>
      {groups.map(([group, groupElements], groupIndex) => (
        <React.Fragment key={groupIndex}>
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
              barHeight -
              barHeight * (groupElements.length - index);

            const textY = y + barHeight / 2;

            return (
              <React.Fragment key={index}>
                <ElementRect
                  {...metaProps}
                  fill={color}
                  height={barHeight}
                  width={width}
                  x={barWidth === paddedBarWidth ? titleWidth : 0}
                  y={y}
                  meta={{ ...groupElements[index], index }}
                />
                {legend ? null : (
                  <ElementTitle
                    {...metaProps}
                    ref={titleTypographyMethodsRef}
                    dominantBaseline={'middle'}
                    fill={legend ? 'transparent' : textColor}
                    meta={groupElements[index]}
                    x={0}
                    y={textY}
                    {...(legend && { width: 0 })}
                  >
                    {title}
                  </ElementTitle>
                )}
                <ElementValue
                  {...metaProps}
                  dominantBaseline={'middle'}
                  ref={valueTypographyMethodsRef}
                  {...(barWidth !== paddedBarWidth && { fill: textColor })}
                  meta={groupElements[index]}
                  textAnchor={barWidth === paddedBarWidth ? 'start' : 'end'}
                  x={barWidth === paddedBarWidth ? titleWidth + width : width}
                  y={textY}
                >
                  {' '}
                  <ChartValue fraction={fraction}>{value}</ChartValue>
                  {units}{' '}
                </ElementValue>
              </React.Fragment>
            );
          })}
          {legend && group ? (
            <GroupTitle
              {...metaProps}
              fontWeight={600}
              ref={groupTypographyMethodsRef}
              meta={group}
              x={0}
              y={groupHeight * groupIndex + groupHeight / 2}
            >
              {' '}
              {group}{' '}
            </GroupTitle>
          ) : null}
        </React.Fragment>
      ))}
      {xAxis ? (
        <ChartXAxis
          length={barWidth}
          max={maxValue}
          step={dx}
          units={units}
          x={barWidth === paddedBarWidth ? titleWidth : 0}
          y={VIEWPORT_HEIGHT - barHeight}
        />
      ) : null}
    </g>
  );
}

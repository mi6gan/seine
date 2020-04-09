// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { ChartElement } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';

import {
  defaultChartDy,
  defaultChartFraction,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartUnits,
  defaultChartXAxis,
  defaultChartYAxis,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import { useGroupedElements } from './helpers';
import ChartYAxis from './ChartYAxis';
import ChartValue from './ChartValue';

type Props = {
  elements: ChartElement[],
  maxValue: number,

  dy?: number,
  minValue?: number,
  palette?: string[],
  units?: string,
  xAxis?: boolean,
  yAxis?: boolean,

  elementPathAs?: React.ElementType,
  groupTitleAs?: React.ElementType,
  elementValueAs?: React.ElementType,
};

const GUTTER_WIDTH = VIEWPORT_WIDTH / 10;

/**
 * @description Column chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function LineChartContent({
  elements,
  maxValue: initialMaxValue,
  minValue: initialMinValue = defaultChartMinValue,

  dy = defaultChartDy,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  xAxis = defaultChartXAxis,
  yAxis = defaultChartYAxis,
  fraction = defaultChartFraction,

  dx,
  legend,
  paletteKey,
  textAlignment,

  elementPathAs: ElementPath = 'path',
  groupTitleAs: GroupTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,

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
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(titledElements.length * groups.length);
  const valueHeight = valueMethods.getScaledHeight();

  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(groups.length, (acc, methods) =>
    methods && acc.getWidth() <= methods.getWidth() ? methods : acc
  );

  const titleHeight = titleMethods.getScaledHeight();
  const height = VIEWPORT_HEIGHT - titleHeight;
  const yAxisWidthRef = React.useRef<number>(GUTTER_WIDTH);
  const { current: yAxisWidth } = yAxisWidthRef;

  const graphWidth = VIEWPORT_WIDTH - 2 * yAxisWidth;

  const valueMaxWidth = useAutoMemo(graphWidth / groups.length);
  const valueScale = useAutoMemo(
    Math.min(1, valueMaxWidth / valueMethods.getScaledWidth())
  );

  const titleScale = useAutoMemo(
    Math.min(
      1,
      graphWidth / (groups.length - 1) / titleMethods.getScaledWidth()
    )
  );

  const gridLinesIterator = useAutoMemo(
    xAxis || yAxis
      ? Array.from({
          length: Math.floor((maxValue - minValue) / dy),
        })
      : null
  );

  return (
    <g strokeWidth={valueHeight / 40}>
      {xAxis
        ? groups.map(([group], index, { length }) => (
            <GroupTitle
              {...metaProps}
              ref={titleTypographyMethodsRef}
              dominantBaseline={'hanging'}
              key={index}
              textAnchor={'middle'}
              x={yAxisWidth + (index * graphWidth) / (length - 1)}
              y={height}
              meta={group}
              scale={titleScale}
            >
              {`${group}`}
            </GroupTitle>
          ))
        : null}

      {gridLinesIterator &&
        gridLinesIterator.map(
          (_, index, { length }) =>
            !!((xAxis && index === 0) || (yAxis && index > 0)) && (
              <path
                d={`m${yAxisWidth}  ${height -
                  (index * (height - titleHeight)) / length} ${graphWidth} 0`}
                key={index}
                stroke={index > 0 ? '#f0f0f0' : 'black'}
              />
            )
        )}

      {titledElements.map(({ id, title }, index) => (
        <React.Fragment key={index}>
          <marker id={`circle-${index}`} overflow="visible" orient="auto">
            <circle
              cx={0}
              r={3}
              stroke={'none'}
              fill={palette[index % palette.length]}
            />
          </marker>
          <ElementPath
            {...metaProps}
            d={groups.reduce(
              (acc, [, elements], index) =>
                [
                  acc,
                  yAxisWidth + (index * graphWidth) / (groups.length - 1),
                  height -
                    ((elements
                      .filter((element) => element.id === id)
                      .map(({ value }) => value)[0] || 0) *
                      (height - titleHeight)) /
                      (maxValue - minValue),
                ].join(' '),
              'M'
            )}
            fill={'none'}
            key={['line', id]}
            markerEnd={`url(circle-${index})`}
            markerMid={`url(circle-${index})`}
            markerStart={`url(circle-${index})`}
            stroke={palette[index % palette.length]}
            strokeWidth={valueHeight / 20}
            meta={{ ...titledElements[index], index }}
          />

          {groups.map(([, groupElements], groupIndex, { length }) =>
            groupElements
              .filter((element) => element.id === id)
              .map(({ index, value }) => (
                <ElementValue
                  {...metaProps}
                  key={index}
                  textAnchor={
                    groupIndex === groups.length - 1
                      ? 'end'
                      : groupIndex > 0
                      ? 'middle'
                      : 'start'
                  }
                  x={yAxisWidth + (groupIndex * graphWidth) / (length - 1)}
                  y={
                    height -
                    ((groupElements
                      .filter((element) => element.id === id)
                      .map(({ value }) => value)[0] || 0) *
                      (height - titleHeight)) /
                      (maxValue - minValue) -
                    1
                  }
                  ref={valueTypographyMethodsRef}
                  meta={{ ...elements[index], index }}
                  scale={valueScale}
                  width={valueMaxWidth}
                >
                  <ChartValue fraction={fraction}>{value}</ChartValue>
                  {units}
                </ElementValue>
              ))
          )}
        </React.Fragment>
      ))}

      {!!yAxis && (
        <ChartYAxis
          length={height - titleHeight}
          max={maxValue}
          min={minValue}
          step={dy}
          y={height}
          ref={yAxisWidthRef}
        />
      )}
    </g>
  );
}

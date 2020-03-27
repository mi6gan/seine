// @flow
import * as React from 'react';
import {
  SvgTypography,
  useResizeTargetRef,
  useTypographyChildrenMethods,
} from '@seine/styles';
import type { ChartElement } from '@seine/core';

import {
  defaultChartDy,
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

  dx,
  legend,
  paletteKey,
  textAlignment,

  elementPathAs: ElementPath = 'path',
  groupTitleAs: GroupTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,

  ...metaProps
}: Props) {
  const [maxValue, minValue, titles, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );

  const [
    valueMethods,
    valueTypographyMethodsRef,
  ] = useTypographyChildrenMethods(elements.length);
  const valueHeight = valueMethods.getScaledHeight();

  const [
    titleMethods,
    titleTypographyMethodsRef,
  ] = useTypographyChildrenMethods(groups.length);
  const titleHeight = titleMethods.getScaledHeight();

  const height = VIEWPORT_HEIGHT - titleHeight;
  const yAxisWidthRef = React.useRef<number>(GUTTER_WIDTH);
  const { current: yAxisWidth } = yAxisWidthRef;

  const graphWidth = VIEWPORT_WIDTH - 2 * yAxisWidth;

  return (
    <g strokeWidth={valueHeight / 40} ref={useResizeTargetRef()}>
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
      {!!xAxis &&
        groups.map(([group], index, { length }) => (
          <GroupTitle
            {...metaProps}
            ref={titleTypographyMethodsRef}
            dominantBaseline={'hanging'}
            key={index}
            textAnchor={'middle'}
            x={yAxisWidth + (index * graphWidth) / (length - 1)}
            y={height}
            meta={group}
          >
            {`${group}`}
          </GroupTitle>
        ))}
      {xAxis || yAxis
        ? Array.from({
            length: Math.floor((maxValue - minValue) / dy),
          }).map(
            (_, index, { length }) =>
              !!((xAxis && index === 0) || (yAxis && index > 0)) && (
                <path
                  d={`m${yAxisWidth}  ${height -
                    (index * (height - titleHeight)) / length} ${graphWidth} 0`}
                  key={['grid', index]}
                  stroke={index > 0 ? '#f0f0f0' : 'black'}
                />
              )
          )
        : null}
      {titles.map(({ id, title }, titleIndex) => [
        <marker
          key={['point', titleIndex]}
          id={['point', titleIndex]}
          overflow="visible"
          orient="auto"
        >
          <circle
            cx={0}
            r={3}
            stroke={'none'}
            fill={palette[titleIndex % palette.length]}
          />
        </marker>,

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
          markerEnd={`url(#${['point', titleIndex]})`}
          markerMid={`url(#${['point', titleIndex]})`}
          markerStart={`url(#${['point', titleIndex]})`}
          stroke={palette[titleIndex % palette.length]}
          strokeWidth={valueHeight / 20}
          meta={{ ...titles[titleIndex], index: titleIndex }}
        />,

        ...groups.map(([, groupElements], groupIndex, { length }) =>
          groupElements
            .filter((element) => element.id === id)
            .map(({ index, value }) => (
              <ElementValue
                {...metaProps}
                key={`value.${index}`}
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
                width={graphWidth / groups.length}
              >
                {value}
                {units}
              </ElementValue>
            ))
        ),
      ])}
    </g>
  );
}

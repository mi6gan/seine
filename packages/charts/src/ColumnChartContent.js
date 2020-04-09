// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import type { ChartElement } from '@seine/core';

import {
  defaultChartDy,
  defaultChartFraction,
  defaultChartMinValue,
  defaultChartPalette,
  defaultChartUnits,
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
  yAxis?: boolean,
};

const GUTTER_WIDTH = VIEWPORT_WIDTH / 10;

/**
 * @description Column chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function ColumnChartContent({
  elements,
  maxValue: initialMaxValue,
  minValue: initialMinValue = defaultChartMinValue,

  dy = defaultChartDy,
  palette = defaultChartPalette,
  units = defaultChartUnits,
  yAxis = defaultChartYAxis,
  fraction = defaultChartFraction,

  dx,
  legend,
  xAxis,
  paletteKey,
  textAlignment,

  parentType,

  groupTitleAs: GroupTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,
  elementRectAs: ElementRect = 'rect',
  ...metaProps
}: Props) {
  const [maxValue, minValue, titledElements, groups] = useGroupedElements(
    elements,
    initialMinValue,
    initialMaxValue,
    dy
  );
  const groupWidth = (VIEWPORT_WIDTH - 2 * GUTTER_WIDTH) / groups.length;
  const columnWidth = groupWidth / (titledElements.length + 1);

  const [
    valueMethods,
    valueMethodsRef,
  ] = useTypographyChildrenMethods(
    titledElements.length * groups.length,
    (acc, methods) => (acc.getWidth() >= methods.getWidth() ? acc : methods)
  );
  const scaledTextHeight = valueMethods.getScaledHeight();
  const scale = Math.min(1, columnWidth / valueMethods.getScaledWidth());

  const columnHeight = VIEWPORT_HEIGHT - 2 * scaledTextHeight;

  const [
    groupMethods,
    groupMethodsRef,
  ] = useTypographyChildrenMethods(groups.length, (acc, methods) =>
    acc.getWidth() >= methods.getWidth() ? acc : methods
  );
  const groupScale = Math.min(1, groupWidth / groupMethods.getScaledWidth());

  return (
    <g strokeWidth={scaledTextHeight / 40}>
      {groups.map(([group, groupElements], groupIndex) => {
        return (
          <React.Fragment key={groupIndex}>
            {groupElements.map(({ value }, index) => {
              const rectHeight =
                columnHeight *
                ((Math.max(minValue, Math.min(maxValue, value)) - minValue) /
                  (maxValue - minValue));
              const fill = palette[index % palette.length];

              return (
                <React.Fragment key={index}>
                  <ElementRect
                    {...metaProps}
                    fill={fill}
                    height={rectHeight}
                    width={columnWidth}
                    x={
                      GUTTER_WIDTH +
                      groupWidth * groupIndex +
                      (index + 0.5) * columnWidth
                    }
                    y={columnHeight + scaledTextHeight - rectHeight}
                    meta={{ ...groupElements[index], index }}
                  />
                  ,
                  <SvgTypography
                    {...metaProps}
                    width={columnWidth}
                    fill={'transparent'}
                    ref={valueMethodsRef}
                    textAnchor={'middle'}
                    x={
                      GUTTER_WIDTH +
                      groupWidth * groupIndex +
                      (index + 1) * columnWidth
                    }
                    y={columnHeight + scaledTextHeight - rectHeight}
                  >
                    <ChartValue fraction={fraction}>{value}</ChartValue>
                    {units}
                  </SvgTypography>
                  ,
                  <ElementValue
                    {...metaProps}
                    textAnchor={'middle'}
                    x={
                      GUTTER_WIDTH +
                      groupWidth * groupIndex +
                      (index + 1) * columnWidth
                    }
                    y={columnHeight + scaledTextHeight - rectHeight}
                    meta={groupElements[index]}
                    scale={scale}
                  >
                    <ChartValue fraction={fraction}>{value}</ChartValue>
                    {units}
                  </ElementValue>
                </React.Fragment>
              );
            })}
            <path
              d={`m${GUTTER_WIDTH +
                groupIndex * groupWidth +
                columnWidth / 4} ${columnHeight +
                scaledTextHeight}h${columnWidth * groupElements.length +
                columnWidth / 2}`}
              stroke={'black'}
            />
            <SvgTypography
              {...metaProps}
              ref={groupMethodsRef}
              fill={'transparent'}
              textAnchor={'middle'}
              dominantBaseline={'hanging'}
              x={GUTTER_WIDTH + groupIndex * groupWidth + groupWidth / 2}
              y={VIEWPORT_HEIGHT - scaledTextHeight}
              width={groupWidth}
            >
              {` ${group || ''} `}
            </SvgTypography>
            <GroupTitle
              {...metaProps}
              textAnchor={'middle'}
              dominantBaseline={'hanging'}
              x={GUTTER_WIDTH + groupIndex * groupWidth + groupWidth / 2}
              y={VIEWPORT_HEIGHT - scaledTextHeight}
              meta={group}
              scale={groupScale}
            >
              {` ${group || ''} `}
            </GroupTitle>
          </React.Fragment>
        );
      })}
      {!!yAxis && (
        <ChartYAxis
          finite
          length={columnHeight}
          max={maxValue}
          step={dy}
          units={units}
          y={columnHeight + scaledTextHeight}
          maxWidth={GUTTER_WIDTH}
        />
      )}
    </g>
  );
}

// @flow
import * as React from 'react';
import { SvgTypography } from '@seine/styles';
import { useAutoMemo } from 'hooks.macro';
import type { ChartElement } from '@seine/core';

import {
  defaultChartPalette,
  defaultPieChartLegend,
  defaultPieChartUnits,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';

type Props = {
  elements: ChartElement[],

  palette?: string[],
  units?: string,
};

const RADIUS = VIEWPORT_HEIGHT / 2;
const INNER_RADIUS = RADIUS / 3;
const CENTER = RADIUS;
const GUTTER_WIDTH = Math.max(0, VIEWPORT_WIDTH - VIEWPORT_HEIGHT) / 2;
const OUTER_RADIUS = RADIUS + GUTTER_WIDTH / 2;
const START = (3 * Math.PI) / 4;

/**
 * @description Pie chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function PieChartContent({
  elements,
  legend = defaultPieChartLegend,
  palette = defaultChartPalette,
  units = defaultPieChartUnits,

  dx,
  dy,
  minValue,
  maxValue,
  paletteKey,
  xAxis,
  yAxis,

  elementTitleAs: ElementTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,
  elementPathAs: ElementPath = 'path',

  ...metaProps
}): Props {
  const sum = useAutoMemo(elements.reduce((acc, { value }) => acc + value, 0));
  const quarter = useAutoMemo(sum / 4);

  const slices = useAutoMemo(
    elements
      .reduce(
        ([head, ...acc], { title, value }, index) => {
          const start = head.end;
          const end = head.end + (2 * value * Math.PI) / sum;

          return [
            {
              length: end - start,
              meta: { ...elements[index], index },

              start,
              startX: head.endX,
              startY: head.endY,

              end,
              endX: Math.cos(end),
              endY: Math.sin(end),

              textX:
                CENTER +
                (legend
                  ? RADIUS / 2
                  : value >= quarter
                  ? INNER_RADIUS
                  : OUTER_RADIUS) *
                  Math.cos(start + (end - start) / 2),
              textY:
                CENTER +
                (legend
                  ? RADIUS / 2
                  : value >= quarter
                  ? INNER_RADIUS
                  : OUTER_RADIUS) *
                  Math.sin(start + (end - start) / 2),

              title,
              value,
            },
            head,
            ...acc,
          ];
        },
        [{ end: START, endX: Math.cos(START), endY: Math.sin(START) }]
      )
      .reverse()
      .slice(1)
  );

  return (
    <g>
      {[
        ...slices.map(({ startX, startY, length, endX, endY, meta }, index) => (
          <ElementPath
            {...metaProps}
            meta={meta}
            d={[
              `M ${GUTTER_WIDTH + CENTER + RADIUS * endX} ${CENTER +
                RADIUS * endY}`,
              `A ${RADIUS} ${RADIUS} 0 ${+(length > Math.PI)} 0 ${GUTTER_WIDTH +
                CENTER +
                RADIUS * startX} ${CENTER + RADIUS * startY}`,
              `L ${GUTTER_WIDTH + CENTER} ${CENTER}`,
              `L ${GUTTER_WIDTH + CENTER + RADIUS * endX} ${CENTER +
                RADIUS * endY}`,
            ].join(' ')}
            fill={palette[index % palette.length]}
            key={`slice.${index}`}
          />
        )),
        ...slices.map(({ title, value, textX, textY, meta }, index) => {
          const textColor = value >= quarter || legend ? 'white' : 'black';

          return [
            <ElementValue
              {...metaProps}
              meta={meta}
              fill={textColor}
              key={`value.${index}`}
              dominantBaseline={legend ? 'middle' : 'baseline'}
              textAnchor={'middle'}
              variant={'h4'}
              fontWeight={400}
              x={GUTTER_WIDTH + textX}
              y={textY}
              {...(value < quarter && !legend && { width: GUTTER_WIDTH })}
            >
              {value}
              {units}
            </ElementValue>,

            !legend && (
              <ElementTitle
                {...metaProps}
                meta={meta}
                dominantBaseline={'hanging'}
                fill={textColor}
                key={`title.${index}`}
                textAnchor={'middle'}
                variant={'h5'}
                fontWeight={400}
                x={GUTTER_WIDTH + textX}
                y={textY}
                width={2 * RADIUS}
                {...(value < quarter && !legend && { width: GUTTER_WIDTH })}
              >
                {title}
              </ElementTitle>
            ),
          ];
        }),
      ]}
    </g>
  );
}

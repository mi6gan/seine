// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import { useAutoMemo } from 'hooks.macro';
import type { ChartElement } from '@seine/core';

import {
  defaultChartPalette,
  defaultPieChartLegend,
  defaultPieChartUnits,
  VIEWPORT_HEIGHT,
} from './constants';

type Props = {
  elements: ChartElement[],

  palette?: string[],
  units?: string,
};

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
  textAlignment,

  elementPathAs: ElementPath = 'path',
  elementTitleAs: ElementTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,

  ...metaProps
}): Props {
  const [textMethods, textMethodsRef] = useTypographyChildrenMethods(
    elements.length * (!legend + 1)
  );

  const gutter = textMethods.getScaledWidth();
  const radius = (VIEWPORT_HEIGHT - gutter) / 2;
  const innerRadius = radius / 2;

  const centerX = (VIEWPORT_HEIGHT - gutter) / 2;
  const centerY = VIEWPORT_HEIGHT / 2;
  const outerRadius = radius + gutter / 3;
  const offset = (3 * Math.PI) / 4;

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
                centerX +
                (legend
                  ? radius / 2
                  : value >= quarter
                  ? innerRadius
                  : outerRadius) *
                  Math.cos(start + (end - start) / 2),
              textY:
                centerY +
                (legend
                  ? radius / 2
                  : value >= quarter
                  ? innerRadius
                  : outerRadius) *
                  Math.sin(start + (end - start) / 2),

              title,
              value,
            },
            head,
            ...acc,
          ];
        },
        [{ end: offset, endX: Math.cos(offset), endY: Math.sin(offset) }]
      )
      .reverse()
      .slice(1)
  );

  return [
    ...slices.map(({ startX, startY, length, endX, endY, meta }, index) => (
      <ElementPath
        {...metaProps}
        meta={meta}
        d={[
          `M ${gutter + centerX + radius * endX} ${centerY + radius * endY}`,
          `A ${radius} ${radius} 0 ${+(length > Math.PI)} 0 ${gutter +
            centerX +
            radius * startX} ${centerY + radius * startY}`,
          `L ${gutter + centerX} ${centerY}`,
          `L ${gutter + centerX + radius * endX} ${centerY + radius * endY}`,
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
          ref={textMethodsRef}
          meta={meta}
          fill={textColor}
          key={`value.${index}`}
          dominantBaseline={legend ? 'middle' : 'baseline'}
          textAnchor={'middle'}
          variant={'h4'}
          fontWeight={400}
          x={gutter + textX}
          y={textY}
          width={value < quarter && !legend ? gutter : radius}
        >
          {value}
          {units}
        </ElementValue>,

        !legend && (
          <ElementTitle
            {...metaProps}
            ref={textMethodsRef}
            meta={meta}
            dominantBaseline={'hanging'}
            fill={textColor}
            key={`title.${index}`}
            textAnchor={'middle'}
            variant={'h5'}
            fontWeight={400}
            x={gutter + textX}
            y={textY}
            width={value < quarter && !legend ? gutter : radius}
          >
            {title}
          </ElementTitle>
        ),
      ];
    }),
  ];
}

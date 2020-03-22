// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';
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

  elementPathAs?: React.ElementType,
  elementTitleAs?: React.ElementType,
  elementValueAs?: React.ElementType,

  onAutoFormat: ($Shape<Props>) => any,
};

/**
 * @description Pie chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function PieChartContent({
  elements,
  legend: initialLegend = defaultPieChartLegend,
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

  onAutoFormat,

  elementPathAs: ElementPath = 'path',
  elementTitleAs: ElementTitle = SvgTypography,
  elementValueAs: ElementValue = SvgTypography,

  ...metaProps
}): Props {
  const [valueMethods, valueMethodsRef] = useTypographyChildrenMethods(
    elements.length
  );
  const valueHeight = valueMethods.getScaledHeight();
  const valueWidth = valueMethods.getScaledWidth();

  const [titleMethods, titleMethodsRef] = useTypographyChildrenMethods(
    elements.length
  );
  const titleHeight = titleMethods.getScaledHeight();
  const titleXScale = titleMethods.getXScale();

  const radius = VIEWPORT_HEIGHT / 2;
  const innerRadius = radius / 2;

  const centerX = VIEWPORT_WIDTH / 2;
  const centerY = VIEWPORT_HEIGHT / 2;
  const sum = useAutoMemo(elements.reduce((acc, { value }) => acc + value, 0));
  const quarter = useAutoMemo(sum / 4);
  const half = useAutoMemo(sum / 4);

  elements = useAutoMemo(
    elements
      .map((element, index) => ({ ...element, index }))
      .sort(({ value: left }, { value: right }) =>
        left > right ? -1 : left < right ? 1 : 0
      )
  );

  const legend = initialLegend || titleHeight + valueHeight > radius;

  const offset = (3 * Math.PI) / 2 - (Math.PI * elements[0].value) / sum;

  const slices = useAutoMemo(
    elements
      .reduce(
        ([head, ...acc], { title, value, index }) => {
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

  useAutoEffect(() => {
    if (legend !== initialLegend) {
      onAutoFormat && onAutoFormat({ legend });
    }
  });

  return [
    ...slices.map(({ startX, startY, length, endX, endY, meta }) => (
      <ElementPath
        {...metaProps}
        meta={meta}
        d={[
          `M ${centerX + radius * endX} ${centerY + radius * endY}`,
          `A ${radius} ${radius} 0 ${+(length > Math.PI)} 0 ${centerX +
            radius * startX} ${centerY + radius * startY}`,
          `L ${centerX} ${centerY}`,
          `L ${centerX + radius * endX} ${centerY + radius * endY}`,
        ].join(' ')}
        fill={palette[meta.index % palette.length]}
        key={`slice.${meta.index}`}
      />
    )),
    ...slices.map(({ title, value, meta, start, end }, index) => {
      const titleColor =
        (value >= quarter && index === 0) || legend ? 'white' : 'black';
      const middle = start + (end - start) / 2;

      const valueX =
        centerX +
        (legend || index > 0 ? radius / 2 : radius - valueWidth) *
          Math.cos(middle);
      const valueY =
        centerY +
        (legend || index > 0 ? radius / 2 : radius - valueHeight) *
          Math.sin(middle);
      const titleX =
        centerX +
        (value >= half && index === 0 ? innerRadius : radius) *
          Math.cos(middle);
      const titleY =
        centerY +
        (value >= half && index === 0 ? radius - 1.5 * valueHeight : radius) *
          Math.sin(middle);

      return [
        <ElementValue
          {...metaProps}
          ref={valueMethodsRef}
          meta={meta}
          fill={'white'}
          dominantBaseline={'middle'}
          key={`value.${meta.index}`}
          textAnchor={'middle'}
          variant={'h4'}
          fontWeight={400}
          x={valueX}
          y={valueY}
        >
          {value}
          {units}
        </ElementValue>,

        <ElementTitle
          {...metaProps}
          ref={titleMethodsRef}
          meta={meta}
          dominantBaseline={'hanging'}
          fill={titleColor}
          key={`title.${meta.index}`}
          textAnchor={
            value >= half && index === 0
              ? 'middle'
              : titleX > centerX
              ? 'start'
              : 'end'
          }
          fontWeight={400}
          x={titleX}
          y={titleY}
          whiteSpace={'pre-wrap'}
          width={
            value >= half && index === 0
              ? VIEWPORT_WIDTH / 2
              : VIEWPORT_WIDTH / 2 - titleXScale * radius
          }
          {...(legend && { style: { visibility: 'hidden' } })}
        >
          {title}
        </ElementTitle>,
      ];
    }),
  ];
}

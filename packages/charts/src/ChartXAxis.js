// @flow
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

type Props = {
  finite?: boolean,
  length: number,
  noLine?: boolean,
  max: number,
  min?: number,
  step: number,
  units?: string,
  x?: number,
  y: number,
  maxWidth?: number,
};

/**
 * @description Chart range axis based on (min, max, step)
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartXAxis({
  length,
  noLine = false,
  finite = false,
  max,
  min = 0,
  step,
  units = '',
  x = 0,
  y,
}: Props) {
  const count = Math.floor((max - min) / step);
  const iterator = useAutoMemo(Array.from({ length: count + !!finite }));
  const [
    textMethods,
    textMethodsRef,
  ] = useTypographyChildrenMethods(iterator.length - 1, (acc, methods) =>
    methods && methods.getWidth() >= acc.getWidth() ? methods : acc
  );
  const textWidth = textMethods.getScaledWidth();
  const offset = Math.max(length / count, textWidth);
  const visibleCount = Math.round(length / offset);

  return iterator.map((_, index) => (
    <React.Fragment key={index}>
      {!noLine &&
        index !== count &&
        (offset !== textWidth || index <= visibleCount) && (
          <line
            x1={x + offset * index}
            x2={x + offset * (index + 1)}
            y1={y}
            y2={y}
            stroke={'black'}
          />
        )}
      {index > 0 && (
        <SvgTypography
          ref={textMethodsRef}
          x={x + offset * index}
          y={y}
          dominantBaseline={'hanging'}
          textAnchor={'center'}
          {...(offset === textWidth &&
            index >= visibleCount && { style: { visibility: 'hidden' } })}
        >
          {`${parseInt(
            min +
              (index * (max - min)) /
                (offset === textWidth ? visibleCount : count)
          )}${units} `}
        </SvgTypography>
      )}
    </React.Fragment>
  ));
}

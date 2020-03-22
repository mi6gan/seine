// @flow
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import * as React from 'react';

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
  const total = count + !!finite;
  const [{ getScaledWidth }, textMethodsRef] = useTypographyChildrenMethods(
    total - 1
  );
  const textWidth = getScaledWidth();
  const offset = Math.max(length / count, textWidth);
  const visibleCount = Math.round(length / offset);

  return Array.from({ length: total }).map((_, index) => [
    !noLine &&
      index !== count &&
      (offset !== textWidth || index <= visibleCount) && (
        <line
          key={'line'}
          x1={x + offset * index}
          x2={x + offset * (index + 1)}
          y1={y}
          y2={y}
          stroke={'black'}
        />
      ),
    index > 0 && (
      <SvgTypography
        key={'value'}
        ref={textMethodsRef}
        x={x + offset * index}
        y={y}
        dominantBaseline={'hanging'}
        textAnchor={'center'}
        width={offset}
        {...(offset === textWidth &&
          index >= visibleCount && { style: { visibility: 'hidden' } })}
      >
        {`${parseInt(
          min +
            (index * (max - min)) /
              (offset === textWidth ? visibleCount : count)
        )}${units} `}
      </SvgTypography>
    ),
  ]);
}

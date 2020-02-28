// @flow
import { SvgTypography, useTypographyChildrenMethods } from '@seine/styles';
import * as React from 'react';

type Props = {
  axisValueAs?: React.ComponentType,
  arrow?: boolean,
  direction?: 'up' | 'right',
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
export default function ChartAxis({
  arrow = false,
  direction = 'right',
  length,
  noLine = false,
  finite = false,
  maxWidth = null,
  max,
  min = 0,
  step,
  units = '',
  x = 0,
  y,
}: Props) {
  const count = Math.floor((max - min) / step);
  const offset = length / count;
  const total = count + !!finite;
  const [
    { getScaledWidth, getYScale, getXScale },
    textMethodsRef,
  ] = useTypographyChildrenMethods(total - 1);
  const textWidth = Math.max(maxWidth, getScaledWidth());

  return (
    <>
      {Array.from({ length: total }).map((_, index) => [
        !noLine && index !== count && (
          <line
            key={'line'}
            x1={x + (direction === 'right' ? offset * index : textWidth)}
            x2={x + (direction === 'right' ? offset * (index + 1) : textWidth)}
            y1={y - (direction === 'up' && offset * index)}
            y2={y - (direction === 'up' && offset * (index + 1))}
            stroke={'black'}
          />
        ),
        index > 0 && (
          <SvgTypography
            key={'value'}
            ref={textMethodsRef}
            x={x + (direction === 'right' ? offset * index : textWidth)}
            y={y - (direction === 'up' && offset * index)}
            {...(direction === 'right' && {
              dominantBaseline: 'hanging',
              textAnchor: 'center',
              width: getXScale(offset),
            })}
            {...(direction === 'up' && {
              dominantBaseline: 'end',
              textAnchor: 'end',
              height: length / total,
              width: textWidth,
              ...(maxWidth !== null && { width: maxWidth }),
            })}
          >
            {`${parseInt(min + (index * (max - min)) / count)}${units}`}
            {direction === 'up' && ' '}
          </SvgTypography>
        ),
      ])}
      {!!arrow && (
        <marker id="arrowUp" overflow="visible" orient="auto">
          <path
            d="m0 0 8-8-32 8 32 8-8-8z"
            fill="#000000"
            fillRule="evenodd"
            stroke="#000000"
          />
        </marker>
      )}
      {!!arrow && (
        <path
          d={`m${textWidth} ${y - length + getYScale(16)}v${1}`}
          fill="none"
          key="y-axis"
          markerStart="url(#arrowUp)"
          stroke="#000000"
        />
      )}
    </>
  );
}

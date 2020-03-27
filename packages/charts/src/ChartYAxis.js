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
export default React.forwardRef(function ChartYAxis(
  {
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
  }: Props,
  ref: React.Ref<number>
) {
  const count = Math.floor((max - min) / step);
  const total = count + !!finite;
  const [textMethods, textMethodsRef] = useTypographyChildrenMethods(total - 1);
  const textWidth = maxWidth ? maxWidth : textMethods.getScaledWidth();
  const textHeight = textMethods.getScaledHeight();
  const offset = Math.max(length / count, textHeight);
  const visibleCount = Math.round(length / offset);

  if (ref) {
    ref.current = textWidth;
  }

  return (
    <>
      {Array.from({ length: total }).map((_, index) => [
        !noLine &&
          index !== count &&
          (offset !== textHeight || index <= visibleCount) && (
            <line
              key={'line'}
              x1={x + textWidth}
              x2={x + textWidth}
              y1={y - offset * index}
              y2={y - Math.min(length, offset * (index + 1))}
              stroke={'black'}
            />
          ),
        index > 0 && (
          <SvgTypography
            key={'value'}
            ref={textMethodsRef}
            x={x + textWidth}
            y={y - offset * index}
            dominantBaseline={'end'}
            textAnchor={'end'}
            width={textWidth}
            {...(offset === textHeight &&
              index > visibleCount && { style: { visibility: 'hidden' } })}
          >
            {`${parseInt(
              min +
                (index * (max - min)) /
                  (offset === textHeight ? visibleCount : count)
            )}${units} `}
          </SvgTypography>
        ),
      ])}
    </>
  );
});

// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import SvgTypographyForeign from './SvgTypographyForeign';
import Typography from './Typography';
import useTypographyChildren from './useTypographyChildren';
import OffscreenCanvasContext from './OffscreenCanvasContext';
import useTheme from './useTheme';

export type SvgTypographyProps = {
  fill?: string,
  textAnchor?: 'start' | 'middle' | 'end',
  dominantBaseline?: 'middle' | 'baseline' | 'hanging',
  meta?: { [string]: any },
};

const StyledTypography = styled(Typography).attrs(({ fill }) => ({
  color: fill,
}))`
  transform-origin: left top;
  position: fixed;
  ${({ transform }) => transform && { transform }};
  white-space: pre;
  text-align: ${({ textAnchor }) =>
    textAnchor === 'end'
      ? 'right'
      : textAnchor === 'middle'
      ? 'center'
      : 'left'};
`;

const CondensedText = styled.span`
  && {
    font-size: ${({ factor }) => factor}em;
    height: 100%;
    width: 100%;
  }
`;

export const defaultTypographyMethods = {
  getWidth: () => 1,
  getHeight: () => 1,
  getXScale: (xScale = 1) => xScale,
  getYScale: (yScale = 1) => yScale,
  getScaledWidth: () => 1,
  getScaledHeight: () => 1,
};

export type SvgTypographyMethods = typeof defaultTypographyMethods;

export type Props = {
  children?: string,
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2',
  x?: number,
  y?: number,
} & SvgTypographyProps;

/**
 * @description Svg foreign text styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
const SvgTypography = React.forwardRef(function SvgTypography(
  {
    meta,
    children,
    dominantBaseline = 'baseline',
    variant = 'body1',
    height = 'auto',
    width = 'auto',
    x = 0,
    y = 0,
    textAnchor = 'start',
    as: Text = StyledTypography,
    ...textProps
  }: Props,
  ref
) {
  const isWebkit = useAutoMemo(navigator.vendor === 'Apple Computer, Inc.');

  const foreignObjectRef = React.useRef(null);
  const { current: foreignElement } = foreignObjectRef;

  const canvasElement = React.useContext(OffscreenCanvasContext);

  const theme = useTheme();

  const text = useTypographyChildren(children);
  const { fontWeight, fontSize, fontFamily, lineHeight } = useAutoMemo(
    foreignElement
      ? getComputedStyle(foreignElement)
      : theme.typography[variant]
  );
  const methods: SvgTypographyMethods = useAutoMemo(() => {
    if (foreignElement) {
      const getHeight = () => theme.typography.round(parseFloat(lineHeight));
      const getXScale = (value = 1) =>
        theme.typography.round(
          ((isWebkit || window.devicePixelRatio) *
            value *
            foreignElement.getBBox().width) /
            foreignElement.getBoundingClientRect().width
        );
      const getYScale = (value = 1) =>
        theme.typography.round(
          ((isWebkit || window.devicePixelRatio) *
            value *
            foreignElement.getBBox().height) /
            foreignElement.getBoundingClientRect().height
        );
      const getWidth = () => {
        const context = canvasElement.getContext('2d');
        context.font = `${fontWeight} ${fontSize} '${fontFamily}'`;
        return context.measureText(text).width * 1.05;
      };
      const getScaledWidth = () => getXScale(getWidth());
      const getScaledHeight = () => getYScale(getHeight());
      return {
        getHeight,
        getWidth,
        getXScale,
        getYScale,
        getScaledWidth,
        getScaledHeight,
      };
    }
    return defaultTypographyMethods;
  });

  React.useImperativeHandle(ref, () => methods, [methods]);

  const scaledWidth = methods.getScaledWidth();
  const scaledHeight = methods.getScaledHeight();

  const condensedFactor = Math.min(
    typeof height === 'number' && height < scaledHeight
      ? height / scaledHeight
      : Infinity,
    typeof width === 'number' && width < scaledWidth
      ? width / scaledWidth
      : Infinity
  );

  return (
    <SvgTypographyForeign
      ref={foreignObjectRef}
      width={foreignElement ? scaledWidth : '100%'}
      height={foreignElement ? scaledHeight : '100%'}
      x={theme.typography.round(
        x -
          (textAnchor === 'start'
            ? 0
            : scaledWidth / (textAnchor === 'end' ? 1 : 2))
      )}
      y={theme.typography.round(
        y -
          (dominantBaseline === 'hanging'
            ? 0
            : scaledHeight / (dominantBaseline === 'baseline' ? 1 : 2))
      )}
    >
      <Text
        variant={variant}
        {...textProps}
        textAnchor={textAnchor}
        width={methods.getWidth()}
        {...(!isWebkit && {
          transform: `scale(${methods.getXScale()}, ${methods.getYScale()})`,
        })}
      >
        {condensedFactor !== Infinity ? (
          <CondensedText factor={condensedFactor}>{children}</CondensedText>
        ) : (
          children
        )}
      </Text>
    </SvgTypographyForeign>
  );
});

export default SvgTypography;

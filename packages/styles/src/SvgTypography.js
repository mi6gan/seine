// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import SvgTypographyForeign from './SvgTypographyForeign';
import Typography from './Typography';
import useTheme from './useTheme';
import useTypographyChildren from './useTypographyChildren';

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

const TextBox = styled(StyledTypography)`
  position: absolute;
  visibility: hidden;
  width: auto;
  z-index: -1;
`;

const CondensedText = styled.span`
  && {
    display: inline-block;
    transform-origin: ${({ textAnchor, dominantBaseline }) =>
      `${
        textAnchor === 'end'
          ? 'right'
          : textAnchor === 'middle'
          ? 'center'
          : 'left'
      } ${
        dominantBaseline === 'middle'
          ? 'center'
          : dominantBaseline === 'hanging'
          ? 'top'
          : 'bottom'
      }`};
    transform: scale(${({ factor }) => factor});
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
  const isBlink = useAutoMemo(
    !isWebkit && /applewebkit/i.test(navigator.userAgent)
  );

  const foreignObjectRef = React.useRef(null);
  const { current: foreignElement } = foreignObjectRef;

  const textBoxRef = React.useRef(null);
  const { current: textBox } = textBoxRef;

  const theme = useTheme();

  const methods: SvgTypographyMethods = useAutoMemo(() => {
    if (foreignElement) {
      const getXScale = (value = 1) =>
        theme.typography.round(
          ((isBlink ? window.devicePixelRatio : 1) *
            value *
            foreignElement.getBBox().width) /
            foreignElement.getBoundingClientRect().width
        );
      const getYScale = (value = 1) =>
        theme.typography.round(
          ((isBlink ? window.devicePixelRatio : 1) *
            value *
            foreignElement.getBBox().height) /
            foreignElement.getBoundingClientRect().height
        );
      const getWidth = () => textBox && textBox.offsetWidth;
      const getHeight = () => textBox && textBox.offsetHeight;
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

  const text = useTypographyChildren(children);

  return (
    <SvgTypographyForeign
      ref={foreignObjectRef}
      width={foreignElement ? Math.ceil(scaledWidth) : '100%'}
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
      <TextBox
        ref={textBoxRef}
        variant={variant}
        {...textProps}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        {...(!isWebkit && {
          transform: `scale(${methods.getXScale()}, ${methods.getYScale()})`,
        })}
      >
        {text}
      </TextBox>
      {textBox && (
        <Text
          variant={variant}
          {...textProps}
          textAnchor={textAnchor}
          dominantBaseline={dominantBaseline}
          width={methods.getWidth()}
          {...(!isWebkit && {
            transform: `scale(${methods.getXScale()}, ${methods.getYScale()})`,
          })}
        >
          {condensedFactor !== Infinity ? (
            <CondensedText
              factor={condensedFactor}
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
              width={methods.getWidth()}
            >
              {children}
            </CondensedText>
          ) : (
            children
          )}
        </Text>
      )}
    </SvgTypographyForeign>
  );
});

export default SvgTypography;

// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

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

const StyledTypography = styled(Typography).attrs(
  ({ fill, transform, width, height, whiteSpace = 'pre' }) => ({
    transform,
    whiteSpace,
    style: {
      transform,
      color: fill,
      whiteSpace,
      ...(width && { width }),
      ...(height && { height }),
    },
  })
)`
  transform-origin: left top;
  position: fixed;
  text-align: ${({ textAnchor }) =>
    textAnchor === 'end'
      ? 'right'
      : textAnchor === 'middle'
      ? 'center'
      : 'left'};
`;

const TextBox = styled(StyledTypography).attrs(
  ({ whiteSpace = 'pre', width = 'auto' }) => ({
    width: whiteSpace === 'pre' ? 'auto' : width,
  })
)`
  position: absolute;
  visibility: hidden;
  z-index: -1;
`;

export const defaultTypographyMethods = {
  getWidth: () => 0,
  getHeight: () => 0,
  getXScale: (xScale = 1) => xScale,
  getYScale: (yScale = 1) => yScale,
  getScaledWidth: () => 0,
  getScaledHeight: () => 0,
};

export type SvgTypographyMethods = typeof defaultTypographyMethods;

export const CondensedText = styled.span`
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

export type Props = {
  children?: string,
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2',
  x?: number,
  y?: number,
  whiteSpace: 'pre' | 'pre-wrap',
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
    whiteSpace = 'pre',
    scale: condensedFactor = Infinity,
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

  const [textBox, textBoxRef] = React.useState(null);

  const theme = useTheme();

  const methods: SvgTypographyMethods = useAutoMemo(() => {
    if (foreignElement) {
      const getXScale = (value = 1) => {
        const foreignWidth = foreignElement.getBoundingClientRect().width;
        if (foreignWidth) {
          return theme.typography.round(
            ((isBlink ? window.devicePixelRatio : 1) *
              value *
              foreignElement.getBBox().width) /
              foreignWidth
          );
        }
        return value;
      };
      const getYScale = (value = 1) => {
        const foreignHeight = foreignElement.getBoundingClientRect().height;
        if (foreignHeight) {
          return theme.typography.round(
            ((isBlink ? window.devicePixelRatio : 1) *
              value *
              foreignElement.getBBox().height) /
              foreignHeight
          );
        }
        return value;
      };
      const getWidth = () =>
        whiteSpace === 'pre' && textBox ? textBox.offsetWidth : width;
      const getHeight = () => textBox && textBox.offsetHeight;
      const getScaledWidth = () => {
        const width = getWidth();
        if (typeof width === 'number') {
          return getXScale(width);
        }
        return width;
      };
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

  if (condensedFactor === Infinity && whiteSpace === 'pre') {
    condensedFactor = Math.min(
      typeof height === 'number' && height < scaledHeight
        ? height / scaledHeight
        : Infinity,
      typeof width === 'number' && width < scaledWidth
        ? width / scaledWidth
        : Infinity
    );
  }
  const text = useTypographyChildren(children);

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
      <TextBox
        {...textProps}
        ref={textBoxRef}
        variant={variant}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        whiteSpace={whiteSpace}
        {...(!isWebkit && {
          transform: `scale(${methods.getXScale()}, ${methods.getYScale()})`,
        })}
      >
        {text}
      </TextBox>
      {textBox && (
        <Text
          {...textProps}
          overflow={'visible'}
          variant={variant}
          textAnchor={textAnchor}
          dominantBaseline={dominantBaseline}
          width={methods.getWidth()}
          whiteSpace={whiteSpace}
          {...(!isWebkit && {
            transform: `scale(${methods.getXScale()}, ${methods.getYScale()})`,
          })}
        >
          {condensedFactor !== Infinity ? (
            <CondensedText
              factor={condensedFactor}
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
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

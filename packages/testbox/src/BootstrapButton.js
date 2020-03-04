// @flow
import styled from 'styled-components/macro';

export type Props = {};

const BootstrapButton = styled.button.attrs(
  ({
    variant = 'body1',
    theme: {
      bootstrap,
      typography: {
        [variant]: { fontSize: defaultFontSize },
      },
    },
    borderWidth = bootstrap.borderWidth,
    disabledOpacity = bootstrap.btnDisabledOpacity,
    fontSize = defaultFontSize,
    fontWeight = bootstrap.btnFontWeight,
    padding = `${bootstrap.btnPaddingY} ${bootstrap.btnPaddingX}`,
    lineHeight,
    borderRadius,
  }) => ({
    borderWidth,
    disabledOpacity,
    fontWeight,
    fontSize,
    padding,
    lineHeight,
    borderRadius,
  })
)`
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border-style: solid;
  outline: 0;
  transition: all 0.3s ease-in-out;

  &&:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  &&.disabled,
  &&:disabled {
    opacity: ${({ disabledOpacity }) => disabledOpacity};
  }

  ${({ backgroundColor }) =>
    backgroundColor && { backgroundColor, borderColor: backgroundColor }};
  ${({ color }) => color && { color }};

  ${({
    borderWidth,
    fontSize,
    fontWeight,
    padding,
    lineHeight,
    borderRadius,
  }) => ({
    borderWidth,
    fontSize,
    fontWeight,
    padding,
    lineHeight,
    borderRadius,
  })}
`;

export default BootstrapButton;

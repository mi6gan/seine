// @flow
import styled, { css } from 'styled-components/macro';

export type Props = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2',
  fontFamily: string,
  fontSize: number | string,
  fontWeight: number | string,
  lineHeight: number | string,
};

const BootstrapTypography = styled.p`
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: {
          fontFamily,
          fontSize: defaultFontSize,
          fontWeight: defaultFontWeight,
          lineHeight,
        },
      },
    },
    fontSize = defaultFontSize,
    fontWeight = defaultFontWeight,
    noMargin = false,
  }) => ({
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    ...(noMargin &&
      css`
        && {
          margin: 0;
        }
      `),
  })}
`;

export default BootstrapTypography;

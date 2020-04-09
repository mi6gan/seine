// @flow
import styled from 'styled-components/macro';

const Typography = styled.p`
  margin: 0;
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: {
          fontFamily: defaultFontFamily,
          fontSize: defaultFontSize,
          fontWeight: defaultFontWeight,
          lineHeight: defaultLineHeight,
        },
      },
    },
    fontFamily = defaultFontFamily,
    fontSize = defaultFontSize,
    fontWeight = defaultFontWeight,
    lineHeight = defaultLineHeight,
    overflow = 'hidden',
  }) => ({
    fontWeight,
    fontFamily,
    fontSize,
    lineHeight,
    overflow,
  })}
`;

export default Typography;

// @flow
import styled from 'styled-components/macro';

const Typography = styled.p`
  margin: 0;
  ${({ width }) => width && { width }};
  ${({ height }) => height && { height }};

  ${({ inline }) => inline && { display: 'inline' }};
  ${({ overflow = 'hidden' }) => overflow && { overflow }};

  ${({ color }) => color && { color }};
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
  }) => ({
    fontWeight,
    fontFamily,
    fontSize,
    lineHeight,
  })}
`;

export default Typography;

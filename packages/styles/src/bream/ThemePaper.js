// @flow
import styled, { css } from 'styled-components/macro';

export type Props = {
  variant: 'p-off' | 'two' | 'loader',
};

const ThemePaper = styled.div`
  ${({ theme: { bootstrap }, variant = 'p-off' }) => css`
    background: ${bootstrap.white};
    border-radius: ${bootstrap.borderRadius}px;
    border: ${bootstrap.borderWidth}px solid ${bootstrap.borderColor};

    ${({ borderLeft }) => borderLeft && { borderLeft }}
    ${({ borderRight }) => borderRight && { borderRight }}

    ${variant === 'two' &&
      css`
        position: relative;
        padding: 1.8rem 2rem;
      `}

    ${variant === 'loader' &&
      css`
        overflow: hidden;
        min-height: 8.6rem;
        padding: 0 0 0 2rem;
        & > p {
          padding: 2rem 2rem 2rem 0;
        }
      `}
  `}
`;

export default ThemePaper;

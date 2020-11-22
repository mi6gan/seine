// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import ChartLayoutTitle from './ChartLayoutTitle';

const ChartLayoutContent = styled.div`
  height: 75%;
`;

const ChartLayoutDescription = styled.div`
  justify-content: ${({ textAlignment }) => textAlignment};
  display: flex;
  flex-wrap: wrap;
  align-items: start;
`;

const ChartLayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  position: relative;
  ${ChartLayoutTitle},
  ${ChartLayoutContent},
  ${ChartLayoutDescription} {
    width: 100%;
    margin-left: auto;
    margin-right: auto
  ${({ theme: { breakpoints } }) => css`
    max-width: 65vw;
    ${breakpoints.up('md')} {
      max-width: 35vw;
    }
  `}
  }
  ${({ visibility }) => visibility && { visibility }};
  max-height: ${({ height }) => height}vh;
`;

// eslint-disable-next-line
export default React.forwardRef(function ChartLayout(
  { title, children, description, textAlignment, ...props }: Props,
  ref
) {
  const [content, ...extensions] = React.Children.toArray(children);

  return (
    <ChartLayoutContainer {...props} ref={ref}>
      <ChartLayoutTitle textAlignment={textAlignment}>{title}</ChartLayoutTitle>
      <ChartLayoutContent>{content}</ChartLayoutContent>
      <ChartLayoutDescription textAlignment={textAlignment}>
        {description}
      </ChartLayoutDescription>
      {extensions}
    </ChartLayoutContainer>
  );
});

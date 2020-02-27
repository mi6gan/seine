// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { TextAlignment } from '@seine/core';

const ChartLayoutTitle = styled.h3`
  ${({ theme: { typography } }) => typography.h3};
  text-align: ${({ textAlignment }) => textAlignment};
  height: 3.5rem;
`;

const ChartLayoutContent = styled.div`
  height: 75%;
`;

const ChartLayoutDescription = styled.div`
  justify-content: ${({ textAlignment }) => textAlignment};
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  min-height: 12.5%;
  height: auto;
`;

const ChartLayoutContainer = styled.div`
  width: 100%;
  box-sizing: content-box;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  ${ChartLayoutTitle},
  ${ChartLayoutContent},
  ${ChartLayoutDescription} {
    max-width: 65vw;
    width: 100%;
    margin-left: auto;
    margin-right: auto
  }
`;

type Props = {
  title: React.Node,
  children: React.Node,
  description: React.Node,
  textAlignment: TextAlignment,
};

/**
 * @description Common layout component for charts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function ChartLayout(
  { title, children, description, textAlignment }: Props,
  ref
) {
  const [content, ...extensions] = React.Children.toArray(children);

  return (
    <ChartLayoutContainer ref={ref}>
      <ChartLayoutTitle textAlignment={textAlignment}>{title}</ChartLayoutTitle>
      <ChartLayoutContent>{content}</ChartLayoutContent>
      <ChartLayoutDescription textAlignment={textAlignment}>
        {description}
      </ChartLayoutDescription>
      {extensions}
    </ChartLayoutContainer>
  );
});

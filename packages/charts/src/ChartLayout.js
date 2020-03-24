// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { TextAlignment } from '@seine/core';

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
  overflow: hidden;
  position: relative;
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

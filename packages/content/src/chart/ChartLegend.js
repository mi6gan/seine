// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { ChartElement } from '@seine/core';

import { defaultChartBody, defaultChartPalette } from './constants';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LegendBox = styled.div`
  background-color: ${({ color }) => color};
  padding: 10px;
`;

const LegendLabel = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: 0 0.75rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  ${({ minWidth }) => minWidth && { minWidth }};
  line-height: 2;
`;

export type Props = {
  elements: ChartElement[],
  palette?: string[],
};

/**
 * @description Chart legend.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartLegend({
  elements = defaultChartBody.elements,
  palette = defaultChartPalette,
}: Props) {
  const minItemWidth = `${100 / elements.length}%`;
  return (
    <Container>
      {elements.map(({ title }, index) => (
        <LegendItem key={index} minWidth={minItemWidth}>
          <LegendBox color={palette[index % palette.length]} />
          <LegendLabel>{title}</LegendLabel>
        </LegendItem>
      ))}
    </Container>
  );
}

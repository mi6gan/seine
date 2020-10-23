// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { defaultChartBody, defaultChartPalette } from './constants';

import type { ChartElement } from '@seine/core';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LegendBox = styled.div`
  background-color: ${({ color }) => color};
  padding: ${({ theme }) => theme.spacing(1, 1)};
`;

const LegendLabel = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: ${({ theme }) => theme.spacing(0, 1)};
  ${({ theme }) => theme.typography.body1};
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

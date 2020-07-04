// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { ChartElement } from '@seine/core';

import { defaultChartPalette } from './constants';

const LegendBox = styled.div`
  background-color: ${({ color }) => color};
  padding: 0.75rem;
`;

const LegendLabel = styled.div`
  white-space: nowrap;
  padding: 0 0.75rem;
`;

const LegendItem = styled.div`
  display: inline-flex;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  align-items: center;
  ${({ minWidth, maxWidth }) => ({
    minWidth,
    maxWidth,
  })};
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
  elements,
  palette = defaultChartPalette,
}: Props) {
  const minItemWidth = `${parseInt(100 / elements.length)}%`;
  return elements.map(({ title }, index) => (
    <LegendItem key={index} minWidth={minItemWidth} maxWidth={'25%'}>
      <LegendBox color={palette[index % palette.length]} />
      <LegendLabel>{title}</LegendLabel>
    </LegendItem>
  ));
}

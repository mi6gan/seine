// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import type { ChartElement } from '@seine/core';

import { defaultChartPalette } from './constants';

const LegendBox = styled.div`
  background-color: ${({ color }) => color};
  width: 1.5rem;
  height: 1.5rem;
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
  const minItemWidth = `${100 / elements.length}%`;
  return elements.map(({ title }, index) => (
    <LegendItem key={index} minWidth={minItemWidth}>
      <LegendBox color={palette[index % palette.length]} />
      <LegendLabel>{title}</LegendLabel>
    </LegendItem>
  ));
}

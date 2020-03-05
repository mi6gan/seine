// @flow
import * as React from 'react';
import type { GridBody, GridFormat } from '@seine/core';
import styled, { css } from 'styled-components/macro';

export type Props = (GridBody & GridFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export const defaultGridColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
export const defaultGridColumnGap = 50;
export const defaultGridRowGap = 50;
export const defaultGridRows = '';

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default styled.div`
  display: grid;
  position: relative;
  ${({
    columns = defaultGridColumns,
    columnGap = defaultGridColumnGap,
    rows = defaultGridRows,
    rowGap = defaultGridRowGap,
  }: Props) => css`
    grid-template-columns: ${columns};
    grid-template-rows: ${rows};
    grid-row-gap: ${Number.isFinite(rowGap) ? `${rowGap}px` : rowGap};
    grid-column-gap: ${Number.isFinite(columnGap)
      ? `${columnGap}px`
      : columnGap};
  `}
`;

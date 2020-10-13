// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import Item from './Item';

import type { GridBody, GridFormat } from '@seine/core';

export type Props = (GridBody & GridFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export const defaultGridColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
export const defaultGridColumnGap = 25;
export const defaultGridRowGap = 12;
export const defaultGridRows = '';
export const defaultGridJustify = 'auto';
export const defaultGridAlignItems = 'auto';

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default styled(Item)`
  display: grid;
  ${({
    columns = defaultGridColumns,
    columnGap = defaultGridColumnGap,
    rows = defaultGridRows,
    rowGap = defaultGridRowGap,
    justify = defaultGridJustify,
    alignItems = defaultGridAlignItems,
  }: Props) => css`
    justify-content: ${justify};
    align-items: ${alignItems};
    grid-template-columns: ${columns};
    grid-template-rows: ${rows};
    grid-row-gap: ${Number.isFinite(rowGap) ? `${rowGap}px` : rowGap};
    grid-column-gap: ${Number.isFinite(columnGap)
      ? `${columnGap}px`
      : columnGap};
  `}
`;

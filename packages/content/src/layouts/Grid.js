// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Item from './Item';

import type { GridBody, GridFormat } from '@seine/core';
import { defaultGridFormat } from '@seine/core';

export type Props = (GridBody & GridFormat) & {
  children: React.ChildrenArray<React.Node>,
};

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default styled(Item)`
  display: grid;
  ${({
    columns = defaultGridFormat.columns,
    columnGap = defaultGridFormat.columnGap,
    rows = defaultGridFormat.rows,
    rowGap = defaultGridFormat.rowGap,
    justify = defaultGridFormat.justify,
    alignItems = defaultGridFormat.alignItems,
  }: Props) => ({
    justifyContent: justify,
    alignItems,
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    rowGap: rowGap,
    columnGap: columnGap,
  })}
`;

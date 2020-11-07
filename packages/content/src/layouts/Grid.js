// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Item from './Item';

import type { GridBody, GridFormat } from '@seine/core';
import { defaultGridFormat } from '@seine/core';

type Props = (GridBody & GridFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export type { Props as GridProps };

/**
 * @description Grid container content component.
 * @param {Props} props
 * @returns {React.Node}
 */
const Grid = styled(Item)`
  display: grid;
  ${({
    columns = defaultGridFormat.columns,
    columnGap = defaultGridFormat.columnGap,
    rows = defaultGridFormat.rows,
    rowGap = defaultGridFormat.rowGap,
    justify = defaultGridFormat.justify,
    alignItems = defaultGridFormat.alignItems,
    theme,
  }: Props) => ({
    justifyContent: justify,
    alignItems,
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    rowGap: theme.spacing(rowGap),
    columnGap: theme.spacing(columnGap),
    padding: theme.spacing(rowGap, columnGap),
  })}
`;

export default (Grid: React.ComponentType<Props>);

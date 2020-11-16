// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Item from './Item';

import type { GridBody, GridFormat } from '@seine/core';

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
  ${({ columnGap, rowGap, theme }: Props) => ({
    rowGap: theme.spacing(rowGap),
    columnGap: theme.spacing(columnGap),
    padding: theme.spacing(rowGap, columnGap),
  })}
`;

export default (Grid: React.ComponentType<Props>);

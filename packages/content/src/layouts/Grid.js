// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import useElementOnlyProps from '../useElementOnlyProps';

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
const Grid = styled(
  React.forwardRef((props, ref) => (
    <Item {...useElementOnlyProps(props, defaultGridFormat)} ref={ref} />
  ))
)`
  display: grid;
  ${({ minSize, maxSize, columnGap, rowGap, theme }: Props) => ({
    gridTemplateColumns: `repeat(auto-fit,minmax(${minSize},${maxSize}))`,
    ...(rowGap && { gridRowGap: theme.spacing(rowGap) }),
    ...(columnGap && { gridColumnGap: theme.spacing(columnGap) }),
    padding: theme.spacing(rowGap, columnGap),
  })}

  & > ${Item}[data-type="line"],
  & > ${Item}[data-type="column"] {
    padding-top: 20px;
  }
  & > ${Item}[data-type="bar"] {
    padding-right: 20px;
  }
`;

export default (Grid: React.ComponentType<Props>);

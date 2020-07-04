// @flow
import styled from 'styled-components/macro';
import type { ItemFormat } from '@seine/core';

const Item = styled.div.attrs(({ layout }: ItemFormat) => ({
  layout,
}))`
  box-sizing: border-box;
  position: relative;

  ${({ maxWidth = 'none', minWidth = 0 }) => ({
    minWidth,
    maxWidth,
  })}

  ${({ layout, alignSelf = 'start' }) =>
    (layout === 'flex' || layout === 'grid') && { alignSelf }}}

  ${({ layout, flexGrow = 0, flexBasis = 'auto', flexShrink }) =>
    layout === 'flex' && {
      flexGrow,
      flexBasis,
      flexShrink,
    }}

  ${({ layout, gridRow = '', gridColumn = '' }) =>
    layout === 'grid' && {
      gridRow,
      gridColumn,
    }}
`;

export default Item;

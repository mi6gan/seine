// @flow
import styled from 'styled-components/macro';

import type { ItemFormat } from '@seine/core';
import { defaultItemFormat } from '@seine/core';

const Item = styled.div.attrs((format: ItemFormat) => ({
  ...defaultItemFormat,
  ...format,
}))`
  box-sizing: border-box;
  position: relative;

  ${({ maxWidth, minWidth }) => ({
    minWidth,
    maxWidth,
  })}

  ${({ maxHeight, minHeight }) => ({
    minHeight,
    maxHeight,
  })}

  ${({ layout, alignSelf }) =>
    (layout === 'flex' || layout === 'grid') && { alignSelf }}}

  ${({ layout, flexGrow, flexBasis, flexShrink }) =>
    layout === 'flex' && {
      flexGrow,
      flexBasis,
      flexShrink,
    }}

  ${({ layout, gridRow, gridColumn }) =>
    layout === 'grid' && {
      gridRow,
      gridColumn,
    }}
`;

export default Item;

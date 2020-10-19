// @flow
import styled from 'styled-components/macro';

import type { ItemFormat } from '@seine/core';
import { defaultItemFormat } from '@seine/core';
import { Box } from '@seine/styles';

const Item = styled(Box).attrs((format: ItemFormat) => ({
  ...defaultItemFormat,
  ...format,
}))`
  box-sizing: border-box;
  position: relative;

  ${({ maxWidth, minWidth }) => ({
    minWidth,
    maxWidth,
  })};

  ${({ maxHeight, minHeight }) => ({
    minHeight,
    maxHeight,
  })};

  ${({ layout, alignSelf, justifySelf }) =>
    (layout === 'flex' || layout === 'grid') && {
      alignSelf,
      justifySelf,
    }}};

  ${({ layout, flexGrow, flexBasis, flexShrink }) =>
    layout === 'flex' && {
      flexGrow,
      flexBasis,
      flexShrink,
    }};

  ${({ layout, gridRow, gridColumn }) =>
    layout === 'grid' && {
      gridRow,
      gridColumn,
    }};
`;

export default Item;

// @flow
import styled from 'styled-components/macro';

import type { ItemFormat } from '@seine/core';
import { defaultItemFormat } from '@seine/core';

const Item = styled.div.attrs((format: ItemFormat) => ({
  ...defaultItemFormat,
  ...format,
}))`
  position: relative;
  box-sizing: border-box;
  ${({ maxWidth, minWidth }) => ({
    minWidth,
    maxWidth,
  })};

  ${({ maxHeight, minHeight }) => ({
    minHeight,
    maxHeight,
  })};

  ${({ alignSelf, justifySelf }) => ({
    alignSelf,
    justifySelf,
  })};

  ${({ flexGrow, flexBasis, flexShrink }) => ({
    flexGrow,
    flexBasis,
    flexShrink,
  })};

  ${({ gridRow, gridColumn }) => ({
    gridRow,
    gridColumn,
  })};
`;

export default Item;

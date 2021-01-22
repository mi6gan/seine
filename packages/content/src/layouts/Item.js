// @flow
import * as React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components/macro';

import type { ItemBody, ItemFormat } from '@seine/core';
import { defaultItemFormat } from '@seine/core';

type Props = ItemBody & $Shape<ItemFormat>;

export type { Props as ItemProps };

const Item = styled(
  React.forwardRef(({ id, ...props }, ref) => <div ref={ref} {...props} />)
).attrs((format: Props) => ({
  ...defaultItemFormat,
  ...format,
}))`
  position: relative;
  box-sizing: border-box;
  width: 100%;
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

export default (Item: ComponentType<Props>);

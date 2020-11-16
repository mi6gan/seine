// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Item from './Item';

import type { FlexBody, FlexFormat } from '@seine/core';

type Props = (FlexBody & FlexFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export type { Props as FlexProps };

/**
 * @description Flex content layout container.
 * @param {Props} props
 * @returns {React.Node}
 */
const Flex = styled(Item).attrs(({ theme, spacing }: FlexFormat) => ({
  spacing: theme.spacing(spacing),
}))`
  display: flex;

  ${({ direction, wrap, justify, alignItems, alignContent }: Props) => ({
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems,
    alignContent,
    width: '100%',
  })};

  & > ${Item} {
    ${({ spacing }) => ({ padding: spacing })}
  }
`;

export default (Flex: React.ComponentType<Props>);

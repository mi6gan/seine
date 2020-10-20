// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Item from './Item';

import type { FlexBody, FlexFormat } from '@seine/core';
import { defaultFlexFormat } from '@seine/core';

export type Props = (FlexBody & FlexFormat) & {
  children: React.ChildrenArray<React.Node>,
};

/**
 * @description Flex content layout container.
 * @param {Props} props
 * @returns {React.Node}
 */
const Flex = styled(Item).attrs(
  ({
    theme,
    direction = defaultFlexFormat.direction,
    wrap = defaultFlexFormat.wrap,
    justify = defaultFlexFormat.justify,
    alignItems = defaultFlexFormat.alignItems,
    alignContent = defaultFlexFormat.alignContent,
    spacing = defaultFlexFormat.spacing,
  }: FlexFormat) => ({
    direction,
    wrap,
    justify,
    alignItems,
    alignContent,
    spacing: theme.spacing(spacing),
  })
)`
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
    ${({ spacing }) => ({ padding: spacing / 2 })}
  }
`;

export default Flex;

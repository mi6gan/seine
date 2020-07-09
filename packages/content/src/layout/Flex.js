// @flow
import * as React from 'react';
import type { FlexBody, FlexFormat } from '@seine/core';
import { defaultFlexFormat } from '@seine/core';
import styled from 'styled-components/macro';

import Item from './Item';

export type Props = (FlexBody & FlexFormat) & {
  children: React.ChildrenArray<React.Node>,
};

/**
 * @description Flex content layout container.
 * @param {Props} props
 * @returns {React.Node}
 */
const Flex = styled.div.attrs(
  ({
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
    spacing: spacing * 4,
  })
)`
  display: flex;
  position: relative;
  box-sizing: border-box;

  ${({
    direction,
    wrap,
    justify,
    alignItems,
    alignContent,
    spacing,
  }: Props) => ({
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems,
    alignContent,
    margin: -spacing / 2,
    width: `calc(100% + ${spacing}px)`,
  })};

  & > ${Item} {
    ${({ spacing }) => ({ padding: spacing / 2 })}
  }
`;

export default Flex;

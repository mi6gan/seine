// @flow
import * as React from 'react';
import type { FlexBody, FlexFormat } from '@seine/core';
import styled from 'styled-components/macro';

import Item from './Item';

export type Props = (FlexBody & FlexFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export const defaultFlexDirection = 'row';
export const defaultFlexWrap = 'nowrap';
export const defaultFlexJustify = 'normal';
export const defaultFlexAlignItems = 'normal';
export const defaultFlexAlignContent = 'normal';
export const defaultFlexSpacing = 10;

/**
 * @description Flex content layout container.
 * @param {Props} props
 * @returns {React.Node}
 */
export default styled.div.attrs(
  ({
    direction = defaultFlexDirection,
    wrap = defaultFlexWrap,
    justify = defaultFlexJustify,
    alignItems = defaultFlexAlignItems,
    alignContent = defaultFlexAlignContent,
    spacing = defaultFlexSpacing,
  }) => ({
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

  box-sizing: border-box;
  & > ${Item} {
    box-sizing: border-box;
    flex-basis: auto;
    flex-grow: 0;
    max-width: none;
    ${({ spacing }) => ({ padding: spacing / 2 })}
  }
`;

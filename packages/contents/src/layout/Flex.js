// @flow
import * as React from 'react';
import type { FlexBody, FlexFormat } from '@seine/core';
import styled from 'styled-components/macro';

export type Props = (FlexBody & FlexFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export const defaultFlexDirection = 'row';
export const defaultFlexWrap = 'nowrap';
export const defaultFlexJustify = 'normal';
export const defaultFlexAlignItems = 'normal';
export const defaultFlexAlignContent = 'normal';

/**
 * @description Flex content layout container.
 * @param {Props} props
 * @returns {React.Node}
 */
export default styled.div`
  display: flex;
  position: relative;
  ${({
    direction = defaultFlexDirection,
    wrap = defaultFlexWrap,
    justify = defaultFlexJustify,
    alignItems = defaultFlexAlignItems,
    alignContent = defaultFlexAlignContent,
  }: Props) => ({
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems,
    alignContent,
  })}
`;

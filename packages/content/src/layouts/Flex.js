// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import useElementOnlyProps from '../useElementOnlyProps';

import Item from './Item';

import type { FlexBody, FlexFormat } from '@seine/core';
import { defaultFlexFormat } from '@seine/core';

type Props = (FlexBody & FlexFormat) & {
  children: React.ChildrenArray<React.Node>,
};

export type { Props as FlexProps };

/**
 * @description Flex content layout container.
 * @param {Props} props
 * @returns {React.Node}
 */
const Flex = styled((props) => (
  <Item {...useElementOnlyProps(props, defaultFlexFormat)} />
)).attrs(({ theme, spacing }: FlexFormat) => ({
  ...defaultFlexFormat,
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

  & > ${Item}[data-type="line"],
  & > ${Item}[data-type="column"] {
    ${({ spacing }) => ({
      paddingTop:
        typeof spacing === 'string' ? `calc(${spacing} + 20px)` : spacing + 20,
    })}
  }

  & > ${Item}[data-type="bar"] {
    ${({ spacing }) => ({
      paddingRight:
        typeof spacing === 'string' ? `calc(${spacing} + 20px)` : spacing + 20,
    })}
  }
`;

export default (Flex: React.ComponentType<Props>);

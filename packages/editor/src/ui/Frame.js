// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

import {
  useBlocksBuffer,
  useBlocksDispatch,
  useBlocksSelector,
} from '../context';
import useSelectedLayoutItems from '../layout/useSelectedLayoutItems';

import { Item } from '@seine/content';
import { SELECT_BLOCK } from '@seine/core';

const StyledFrame = styled(Item)`
  transition: ${({ theme }) =>
    theme.transitions.create(['filter'], {
      duration: theme.transitions.duration.short,
      easing: 'linear',
    })};
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
  }
  &${({ selected = false }) => (selected ? '' : ':hover')}:after {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    z-index: 1;
    border: 1px
      ${({ selected }) =>
        selected === 'self'
          ? 'solid'
          : selected === 'child'
          ? 'dashed'
          : 'dashed'}
      ${({ theme, selected }) =>
        theme.palette.primary[selected === 'self' ? 'main' : 'light']};
    pointer-events: ${({ selected }) => (selected ? 'none' : 'all')};
  }
  &:not(:hover) {
    ${({ selected, item }) => !selected && item && { filter: 'opacity(0.5)' }}
  }
  &:hover {
    ${({ selected }) => !selected && { filter: 'opacity(0.5)' }}
  }
`;

// eslint-disable-next-line
export default function Frame({ children, id, onClick, ...props }) {
  const dispatch = useBlocksDispatch();
  const buffer = useBlocksBuffer();
  const { item, items } = useSelectedLayoutItems();
  const parent = useBlocksSelector(
    ({ blocks }) => item && blocks.find(({ id }) => item['parent_id'] === id)
  );
  const selected =
    item && item.id === id
      ? 'self'
      : (item && item['parent_id'] === id) || (parent && parent['parent_id'])
      ? 'child'
      : false;
  return (
    <StyledFrame
      {...props}
      id={id}
      item={!!item}
      selected={
        buffer
          ? !item
          : items.reduce((acc, item) => acc.add(item['parent_id']), new Set())
              .size === 1 && items.some((item) => item.id === id)
          ? 'self'
          : selected
      }
      onClick={useAutoCallback((event) => {
        if (!buffer) {
          dispatch({
            type: SELECT_BLOCK,
            id,
            ...(event.ctrlKey && {
              modifier: selected ? 'sub' : 'add',
            }),
          });
        }
        onClick && onClick(event);
        event.preventDefault();
        event.stopPropagation();
      })}
    >
      {children}
    </StyledFrame>
  );
}

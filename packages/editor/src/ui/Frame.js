// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { SELECT_BLOCK } from '@seine/core';
import { Item } from '@seine/content';

import { useEditorDispatch } from '../store';
import useSelectedLayoutItems from '../store/useSelectedLayoutItems';

export const StyledFrame = styled(Item)`
  transition: filter 0.15s ease-in-out;
  &${({ selected = false }) => (selected ? '' : ':hover')}:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
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
    cursor: pointer;
  }

  &:not(:hover) {
    ${({ selected, item }) => !selected && item && { filter: 'opacity(0.5)' }}
  }
  &:hover {
    ${({ selected }) => !selected && { filter: 'opacity(0.5)' }}
  }
`;

// eslint-disable-next-line
export default React.forwardRef(function Frame(
  { children, id, ...props },
  ref
) {
  const dispatch = useEditorDispatch();
  const { layout, item } = useSelectedLayoutItems();
  const selected =
    (item && item.id === id) || (layout && layout.id === id)
      ? 'self'
      : item && item['parent_id'] === id
      ? 'child'
      : false;
  return (
    <StyledFrame
      {...props}
      ref={ref}
      id={id}
      item={!!item}
      selected={selected}
      onClick={useAutoCallback((event) => {
        dispatch({
          type: SELECT_BLOCK,
          id,
          ...(event.key === 'Control' && {
            modifier: selected ? 'add' : 'sub',
          }),
        });
        event.stopPropagation();
      })}
    >
      {children}
    </StyledFrame>
  );
});

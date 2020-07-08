// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { SELECT_BLOCK } from '@seine/core';
import { Item } from '@seine/content';

export const StyledFrame = styled(Item)`
  &${({ selected }) => (selected ? '' : ':hover')}:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    z-index: 1;
    border: 1px ${({ borderStyle = 'solid' }) => borderStyle}
      ${({ theme }) => theme.palette.primary.light};
    pointer-events: ${({ selected }) => (selected ? 'none' : 'all')};
    cursor: pointer;
  }
`;

// eslint-disable-next-line
export default function Frame({ children, dispatch, id, selected, ...props }) {
  const blockIds = useAutoMemo([
    id,
    ...(children && children.props && Array.isArray(children.props.children)
      ? children.props.children.map(({ id }) => id)
      : []),
  ]);
  return (
    <StyledFrame
      {...props}
      selected={selected}
      onClick={useAutoCallback((event) => {
        blockIds.forEach((id, index) => {
          dispatch(
            index
              ? { type: SELECT_BLOCK, id, modifier: 'add' }
              : { type: SELECT_BLOCK, id }
          );
        });
        event.stopPropagation();
      })}
    >
      {children}
    </StyledFrame>
  );
}

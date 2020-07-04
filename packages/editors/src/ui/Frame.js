// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { SELECT_BLOCK } from '@seine/core';
import { Item } from '@seine/contents';

const StyledFrame = styled(Item)`
  &${({ selected }) => (selected ? '' : ':hover')}:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border: 2px solid ${({ theme }) => theme.palette.primary.light};
    pointer-events: ${({ selected }) => (selected ? 'none' : 'all')};
  }
`;

// eslint-disable-next-line
export default function Frame({ children, dispatch, id, selected, ...props }) {
  return (
    <StyledFrame
      {...props}
      selected={selected}
      onClick={useAutoCallback((event) => {
        if (!selected) {
          dispatch({ type: SELECT_BLOCK, id });
        }
        event.stopPropagation();
      })}
    >
      {children}
    </StyledFrame>
  );
}

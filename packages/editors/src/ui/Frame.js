// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { SELECT_BLOCK } from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';
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
  }
`;

const StyledSelectedFrame = styled(StyledFrame).attrs({
  selected: true,
})`
  &:after {
    pointer-events: none;
  }
`;

// eslint-disable-next-line
export default function Frame({ children, dispatch, id, ...props }) {
  return (
    <StyledFrame
      {...props}
      onClick={useAutoCallback(() => {
        dispatch({ type: SELECT_BLOCK, id });
      })}
    >
      {children}
    </StyledFrame>
  );
}

// eslint-disable-next-line
export function SelectedFrame({ dispatch, id, ...props }) {
  return (
    <ClickAwayListener
      onClickAway={useAutoCallback(() => {
        dispatch({ type: SELECT_BLOCK, id, modifier: 'sub' });
      })}
    >
      <StyledSelectedFrame {...props} />
    </ClickAwayListener>
  );
}

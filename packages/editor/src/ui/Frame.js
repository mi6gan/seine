// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { SELECT_BLOCK } from '@seine/core';
import { Item } from '@seine/content';

import { useEditorDispatch, useSelectedBlocks } from '../store';

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
export default React.forwardRef(function Frame(
  { children, id, ...props },
  ref
) {
  const dispatch = useEditorDispatch();
  const selected = useSelectedBlocks().some(
    (block) => block.id === id || block['parent_id'] === id
  );
  return (
    <StyledFrame
      {...props}
      ref={ref}
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

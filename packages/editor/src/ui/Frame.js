// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { DESELECT_ALL_BLOCKS, SELECT_BLOCK } from '@seine/core';
import { Item } from '@seine/content';
import { Box } from '@seine/styles';

// eslint-disable-next-line
const Frame = React.forwardRef(function Frame(
  { children, id, onClick, as, selected = null, ...props },
  ref
) {
  const dispatch = useBlocksDispatch();
  const blockSelected = useEditorSelector(
    useAutoCallback(({ selection }) => selection.includes(id))
  );
  const forcedSelection = selected !== null;
  if (selected === null) {
    selected = blockSelected;
  }

  return (
    <Item
      {...props}
      ref={ref}
      as={Box}
      forwardedAs={as}
      id={id}
      border={1}
      borderColor={selected ? 'primary.main' : 'transparent'}
      cursor={'pointer'}
      onClick={useAutoCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!forcedSelection) {
          if (selected) {
            dispatch({
              type: DESELECT_ALL_BLOCKS,
            });
          }
          dispatch({
            type: SELECT_BLOCK,
            id,
            ...(event.ctrlKey && {
              modifier: selected ? 'sub' : 'add',
            }),
          });
        }
        onClick && onClick(event);
      })}
      children={children}
    />
  );
});

export default Frame;

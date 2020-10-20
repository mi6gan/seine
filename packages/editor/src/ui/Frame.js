// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch, useBlocksSelector } from '../blocks';

import { DESELECT_ALL_BLOCKS, SELECT_BLOCK } from '@seine/core';
import { Item } from '@seine/content';
import { Box } from '@seine/styles';

// eslint-disable-next-line
export default function Frame({ children, id, onClick, as, ...props }) {
  const dispatch = useBlocksDispatch();
  const selected = useBlocksSelector(
    useAutoCallback(({ selection }) => selection.includes(id))
  );

  return (
    <Item
      {...props}
      as={Box}
      forwardedAs={as}
      id={id}
      border={1}
      borderColor={selected ? 'primary.main' : 'transparent'}
      cursor={'pointer'}
      onClick={useAutoCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
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
        onClick && onClick(event);
      })}
      children={children}
    />
  );
}

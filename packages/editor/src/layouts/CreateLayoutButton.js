// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';
import {
  blockTypes,
  CREATE_BLOCK,
  createBlock,
  defaultLayoutFormat,
  SELECT_BLOCK,
  SET_BLOCK_PARENT,
} from '@seine/core';

// eslint-disable-next-line
const CreateLayoutButton = React.forwardRef(function CreateLayoutButton(
  { as: Button = MuiButton, children, onClick = null, ...buttonProps },
  ref
) {
  const dispatch = useBlocksDispatch();
  const { items } = useSelectedLayoutItems();
  const parentIds = [
    ...items.reduce((acc, item) => acc.add(item['parent_id']), new Set()),
  ];
  const parentId = parentIds[0];

  return (
    <Button
      {...buttonProps}
      ref={ref}
      onClick={useAutoCallback((event) => {
        const block = createBlock(
          blockTypes.LAYOUT,
          null,
          defaultLayoutFormat,
          parentId
        );
        dispatch({
          type: CREATE_BLOCK,
          block,
        });
        for (const item of items) {
          dispatch({
            type: SET_BLOCK_PARENT,
            id: item.id,
            parentId: block.id,
          });
        }
        dispatch({
          type: SELECT_BLOCK,
          id: block.id,
        });
        if (onClick) {
          onClick(event);
        }
      })}
    >
      {children}
    </Button>
  );
});

export default CreateLayoutButton;

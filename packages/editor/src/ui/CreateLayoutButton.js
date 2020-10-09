// @flow
import * as React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';

import useSelectedLayoutItems from '../layout/useSelectedLayoutItems';
import { useBlocksDispatch } from '../context';

import {
  blockTypes,
  CREATE_BLOCK,
  createBlock,
  defaultFlexFormat,
  SELECT_BLOCK,
  SET_BLOCK_PARENT,
} from '@seine/core';

// eslint-disable-next-line
export default function CreateLayoutButton({
  as: Button = MuiButton,
  children,
  onClick = null,
  ...buttonProps
}) {
  const dispatch = useBlocksDispatch();
  const { items } = useSelectedLayoutItems();
  const parentIds = [
    ...items.reduce((acc, item) => acc.add(item['parent_id']), new Set()),
  ];
  const parentId = parentIds[0];

  return (
    <Button
      {...buttonProps}
      onClick={useAutoCallback((event) => {
        const block = createBlock(
          blockTypes.LAYOUT,
          null,
          defaultFlexFormat,
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
      disabled={items.length <= 1 || parentIds.length > 1}
    >
      {children}
    </Button>
  );
}

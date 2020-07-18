// @flow
import * as React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';
import { DELETE_SELECTED_BLOCKS } from '@seine/core';

import useSelectedLayoutItems from '../store/useSelectedLayoutItems';
import { useEditorDispatch } from '../store';

// eslint-disable-next-line
export default function DeleteBlockButton({
  as: Button = MuiButton,
  children,
  ...buttonProps
}) {
  const dispatch = useEditorDispatch();
  const { items } = useSelectedLayoutItems();
  return (
    <Button
      {...buttonProps}
      onClick={useAutoCallback(() => {
        dispatch({ type: DELETE_SELECTED_BLOCKS });
      })}
      disabled={!items.length}
    >
      {children}
    </Button>
  );
}
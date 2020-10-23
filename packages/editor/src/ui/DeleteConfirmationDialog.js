// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch } from '../blocks';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@seine/styles/mui-core.macro';
import { DELETE_SELECTED_BLOCKS } from '@seine/core';
import { ClipboardContext } from '@seine/editor';

// eslint-disable-next-line
export default function DeleteConfirmationDialog() {
  const dispatch = useBlocksDispatch();
  const clipboard = React.useContext(ClipboardContext);

  return (
    <Dialog open={clipboard.type === DELETE_SELECTED_BLOCKS}>
      <DialogTitle>
        Are you sure you want to delete selected blocks?
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={useAutoCallback(() => {
            dispatch(clipboard.pop());
          })}
          color={'primary'}
        >
          Confirm
        </Button>
        <Button
          onClick={useAutoCallback(() => {
            clipboard.pop();
          })}
          color={'secondary'}
        >
          Don't delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

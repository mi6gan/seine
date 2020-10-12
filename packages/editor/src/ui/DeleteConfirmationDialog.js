// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '../../mui-core.macro';
import { BlocksContext } from '../contexts';

import { DELETE_SELECTED_BLOCKS } from '@seine/core';

// eslint-disable-next-line
export default function DeleteConfirmationDialog() {
  const { buffer, setBuffer, dispatch } = React.useContext(BlocksContext);

  return (
    <Dialog open={buffer !== null && buffer.type === DELETE_SELECTED_BLOCKS}>
      <DialogTitle>
        Are you sure you want to delete selected blocks?
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={useAutoCallback(() => {
            setBuffer(null);
            dispatch(buffer);
          })}
          color={'primary'}
        >
          Confirm
        </Button>
        <Button
          onClick={useAutoCallback(() => {
            setBuffer(null);
          })}
          color={'secondary'}
        >
          Don't delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

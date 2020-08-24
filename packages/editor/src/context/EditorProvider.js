// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import type { BlocksAction, BlocksState } from '@seine/core';
import {
  DESELECT_ALL_BLOCKS,
  initialBlocksState,
  reduceBlocks,
} from '@seine/core';

import EditorContext from './EditorContext';

// eslint-disable-next-line
export default function EditorProvider({ blocks, children }) {
  const [state, dispatch] = React.useReducer<BlocksState, BlocksAction>(
    reduceBlocks,
    initialBlocksState,
    useAutoCallback(() => ({
      ...initialBlocksState,
      blocks,
    }))
  );

  const [buffer, setBuffer] = React.useState(null);
  useAutoEffect(() => {
    if (buffer) {
      dispatch({ type: DESELECT_ALL_BLOCKS });
    }
  });
  return (
    <EditorContext.Provider
      value={useAutoMemo({ dispatch, state, buffer, setBuffer })}
    >
      {children}
    </EditorContext.Provider>
  );
}

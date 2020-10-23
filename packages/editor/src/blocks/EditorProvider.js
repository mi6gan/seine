// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import EditorContext from './EditorContext';

import type { BlocksAction, BlocksState } from '@seine/core';
import { initialBlocksState, reduceBlocks } from '@seine/core';

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
  return (
    <EditorContext.Provider
      value={useAutoMemo({ dispatch, state, buffer, setBuffer })}
    >
      {children}
    </EditorContext.Provider>
  );
}

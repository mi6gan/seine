// @flow
import * as React from 'react';
import { initialBlocksState } from '@seine/core';
import type { Action, State } from '@seine/core';

export type EditorContextType = {
  dispatch: (Action) => State,
  state: State,
  buffer: Action,
};

const EditorContext: React.Context<EditorContextType> = React.createContext({
  dispatch: () => {},
  state: initialBlocksState,
  buffer: null,
  setBuffer: () => {},
});

export default EditorContext;

// @flow
import * as React from 'react';

import { initialBlocksState } from '@seine/core';
import type { Action, State } from '@seine/core';

export type EditorContextType = {
  dispatch: (Action) => State,
  state: State,
  buffer: Action,
  setBuffer: (Action) => any,
};

const EditorContext = React.createContext<EditorContextType>({
  dispatch: () => {},
  state: initialBlocksState,
  buffer: null,
  setBuffer: () => {},
});

export default EditorContext;

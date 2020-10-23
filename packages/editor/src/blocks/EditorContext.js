// @flow
import * as React from 'react';

import { initialBlocksState } from '@seine/core';
import type { Action, State } from '@seine/core';

export type BlocksContextType = {
  dispatch: (Action) => State,
  state: State,
};

const EditorContext = React.createContext<BlocksContextType>({
  dispatch: () => {},
  state: initialBlocksState,
});

export default EditorContext;

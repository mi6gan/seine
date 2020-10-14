// @flow
import * as React from 'react';

import type { Block } from '@seine/core';

type ClipboardEntry = Block;

export type Clipboard = ClipboardEntry & {
  replace: (ClipboardEntry) => void,
  push: (ClipboardEntry) => any,
  pop: () => ClipboardEntry,
  toJSON: () => null | ClipboardEntry,
};

export const defaultClipboard = {
  replace: () => void 0,
  push: () => void 0,
  pop: () => void 0,
  toJSON: () => null,
};

const ClipboardContext = React.createContext<Clipboard>(defaultClipboard);

export default ClipboardContext;

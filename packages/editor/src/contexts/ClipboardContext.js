// @flow
import * as React from 'react';

import type { Block } from '@seine/core';

type ClipboardEntry = Block;

export type Clipboard = ClipboardEntry & {
  replace: (ClipboardEntry) => void,
};

export const defaultClipboard = {
  entry: null,
  replace: () => void 0,
};

const ClipboardContext = React.createContext<Clipboard>(defaultClipboard);

export default ClipboardContext;

// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import ClipboardContext, { defaultClipboard } from './ClipboardContext';

import type { Action } from '@seine/core';

// eslint-disable-next-line
export default function ClipboardProvider({ children }) {
  const [entry, setEntry]: Array<Action> = React.useState(defaultClipboard);

  return (
    <ClipboardContext.Provider
      value={useAutoMemo({
        ...entry,
        replace: setEntry,
      })}
    >
      {children}
    </ClipboardContext.Provider>
  );
}

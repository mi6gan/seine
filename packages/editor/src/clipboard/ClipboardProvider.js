// @flow
import * as React from 'react';
import { useAutoMemo, useAutoCallback } from 'hooks.macro';

import ClipboardContext from './ClipboardContext';

import type { Action } from '@seine/core';

// eslint-disable-next-line
export default function ClipboardProvider({ children }) {
  const bufferRef = React.useRef(useAutoMemo([]));
  const { current: buffer } = bufferRef;
  const [entry, setEntry]: Array<Action> = React.useState(null);

  return (
    <ClipboardContext.Provider
      value={{
        ...entry,
        toJSON: () => entry,
        pop: useAutoCallback(() => {
          buffer.pop();
          setEntry(buffer[buffer.length - 1] || null);
        }),
        push: useAutoCallback((nextEntry) => {
          buffer.push(nextEntry);
          setEntry(nextEntry);
        }),
        replace: setEntry,
      }}
    >
      {children}
    </ClipboardContext.Provider>
  );
}

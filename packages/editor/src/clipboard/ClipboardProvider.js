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
          const head = buffer.pop();
          setEntry(buffer[buffer.length - 1] || null);
          return head;
        }),
        push: useAutoCallback((nextEntry) => {
          const count = buffer.push(nextEntry);
          setEntry(nextEntry);
          return count;
        }),
        replace: setEntry,
      }}
    >
      {children}
    </ClipboardContext.Provider>
  );
}

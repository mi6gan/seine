// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';
import ResizeObserver from 'resize-observer-polyfill';

import ResizeObserverContext from './ResizeObserverContext';

type Props = {
  children: React.Node,
};

/**
 * @description Force charts update on resize of each subscribed target.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ResizeObserverProvider({ children }: Props) {
  const [timestamp, setTimestamp] = React.useState(null);
  const [isResizing, setIsResizing] = React.useState(true);
  const timeoutIdRef = React.useRef(null);

  const observer = useAutoMemo(
    new ResizeObserver(() => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      } else {
        setIsResizing(true);
      }
      timeoutIdRef.current = setTimeout(() => {
        timeoutIdRef.current = null;
        setTimestamp(Date.now());
      }, 150);
    })
  );

  useAutoEffect(() => {
    if (timestamp) {
      setIsResizing(false);
    }
  });

  return (
    <ResizeObserverContext.Provider
      value={useAutoMemo({ observer, isResizing, timestamp })}
    >
      {children}
    </ResizeObserverContext.Provider>
  );
}

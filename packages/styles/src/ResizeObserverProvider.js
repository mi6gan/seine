// @flow
import * as React from 'react';
import { useAutoLayoutEffect, useAutoMemo } from 'hooks.macro';
import ResizeObserver from 'resize-observer-polyfill';

import ResizeObserverContext from './ResizeObserverContext';

type Props = {
  children?: any,
};

/**
 * @description Force charts update on resize of each subscribed target.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ResizeObserverProvider({ children = null }: Props) {
  const [count, setCount] = React.useState(0);

  const observer = useAutoMemo(
    new ResizeObserver(() => {
      setCount((n) => (n === Number.MAX_VALUE ? 1 : n + 1));
    })
  );

  useAutoLayoutEffect(() => {
    setCount(1);
  });

  return (
    <ResizeObserverContext.Provider value={useAutoMemo({ observer, count })}>
      {children}
    </ResizeObserverContext.Provider>
  );
}

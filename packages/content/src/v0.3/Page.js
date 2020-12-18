// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';
import ResizeObserver from 'resize-observer-polyfill';

const PageContext = React.createContext({
  observer: null,
  count: 0,
});

// eslint-disable-next-line
export function useResizeTargetRef() {
  const { observer: resizeObserver } = React.useContext(PageContext);

  const resizeTargetRef = React.useRef<HTMLElement>(null);

  useAutoEffect(() => {
    const { current: resizeTarget } = resizeTargetRef;
    if (resizeTarget && resizeObserver) {
      resizeObserver.observe(resizeTarget);
      return () => {
        resizeObserver.unobserve(resizeTarget);
      };
    }
  });

  return resizeTargetRef;
}

const THROTTLE_MS = 250;

// eslint-disable-next-line
export default function Page_v0_3({ children }) {
  const [count, setCount] = React.useState(0);
  const timeoutRef = React.useRef(null);

  const observer = useAutoMemo(
    new ResizeObserver(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        setCount((n) => (n === Number.MAX_VALUE ? 1 : n + 1));
      }, THROTTLE_MS);
    })
  );

  useAutoEffect(() => {
    setCount(1);
    return () => {
      if (timeoutRef.current) {
        const { current: timeoutId } = timeoutRef;
        timeoutRef.current = null;
        clearTimeout(timeoutId);
      }
    };
  });

  return (
    <PageContext.Provider value={useAutoMemo({ observer, count })}>
      {children}
    </PageContext.Provider>
  );
}

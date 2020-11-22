// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';

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

// eslint-disable-next-line
export default function Page_v0_3({ children }) {
  const [count, setCount] = React.useState(0);

  const observer = useAutoMemo(
    new ResizeObserver(() => {
      setCount((n) => (n === Number.MAX_VALUE ? 1 : n + 1));
    })
  );

  useAutoEffect(() => {
    setCount(1);
  });

  return (
    <PageContext.Provider value={useAutoMemo({ observer, count })}>
      {children}
    </PageContext.Provider>
  );
}

// @flow
import * as React from 'react';
import { useAutoEffect } from 'hooks.macro';

import useResizeObserver from './useResizeObserver';

/**
 * @description Use ref of resize observer target.
 * @returns {React.Ref<HTMLElement>}
 */
export default function useResizeTargetRef() {
  const { observer: resizeObserver } = useResizeObserver();

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

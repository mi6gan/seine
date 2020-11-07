// @flow
import * as React from 'react';
import { useAutoEffect } from 'hooks.macro';

import useResizeObserver from './useResizeObserver';

/**
 * @description Use ref of resize observer target.
 * @param {React.Ref?} ref
 * @returns {React.Ref<HTMLElement>}
 */
export default function useResizeTargetRef(ref = null) {
  const { observer: resizeObserver } = useResizeObserver();

  let resizeTargetRef = React.useRef<HTMLElement>(null);
  if (ref) {
    resizeTargetRef = ref;
  }

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

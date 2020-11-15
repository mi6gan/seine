// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';

import type { ScreenDevice } from '@seine/core';
import { useTheme } from '@seine/styles';

// eslint-disable-next-line
function useMatchMedia(alias, setDevice, start = null, end = null) {
  const theme = useTheme();
  const query =
    start === null && end === null
      ? null
      : start === null
      ? theme.breakpoints.down(end)
      : end === null
      ? theme.breakpoints.up(start)
      : theme.breakpoints.between(start, end);
  const mql = useAutoMemo(
    query && window.matchMedia(query.replace('@media ', ''))
  );

  useAutoEffect(() => {
    if (mql) {
      const handler = () => {
        if (mql.matches) {
          setDevice(alias);
        }
      };

      mql.addEventListener('change', handler);

      return () => {
        mql.removeEventListener('change', handler);
      };
    }
  });
}

/**
 * @description Use current screen device identified.
 * @param {?ScreenDevice} initialDevice
 * @returns {'any' | 'mobile'}
 */
export default function useScreenDevice(initialDevice = 'auto'): ScreenDevice {
  const [screenDevice, setScreenDevice] = React.useState('any');

  const md = initialDevice === 'auto' ? 'md' : null;
  const lg = initialDevice === 'auto' ? 'lg' : null;

  useMatchMedia('desktop', setScreenDevice, lg, null);
  useMatchMedia('tablet', setScreenDevice, md, lg);
  useMatchMedia('mobile', setScreenDevice, null, md);

  return initialDevice === 'auto' ? screenDevice : initialDevice;
}

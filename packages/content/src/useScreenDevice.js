// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';

import type { ScreenDevice } from '@seine/core';
import { useTheme } from '@seine/styles';

/**
 * @description Use current screen device identified.
 * @param {?ScreenDevice} initialDevice
 * @returns {'any' | 'mobile'}
 */
export default function useScreenDevice(initialDevice = 'auto'): ScreenDevice {
  const theme = useTheme();
  const mql = useAutoMemo(
    initialDevice === 'auto' &&
      window.matchMedia(theme.breakpoints.up('md').replace('@media ', ''))
  );
  const [screenDevice, setScreenDevice] = React.useState('any');

  const device = initialDevice === 'auto' ? screenDevice : initialDevice;

  useAutoEffect(() => {
    if (mql) {
      const handler = () => {
        setScreenDevice(mql.matches ? 'any' : 'mobile');
      };

      mql.addEventListener('change', handler);

      return () => {
        mql.removeEventListener('change', handler);
      };
    }
  });

  return device;
}

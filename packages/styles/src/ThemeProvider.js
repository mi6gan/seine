// @flow
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import { useAutoEffect } from 'hooks.macro';

import defaultTheme from './defaultTheme';
import useTheme from './useTheme';

import type { Theme } from '@seine/styles/mui-core.macro.d';

type Props = {
  children: React.Node,
  theme?: Theme,
};

/**
 * @description Provide a default for an empty theme context.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ThemeProvider({
  children,
  theme = defaultTheme,
}: Props) {
  const currentTheme = useTheme();
  const [ready, setReady] = React.useState(false);
  useAutoEffect(() => {
    if (!currentTheme) {
      let cancelled = false;
      if ('fonts' in document) {
        if (!ready) {
          document.fonts.ready.then(() => {
            if (!cancelled) {
              setReady(true);
            }
          });
        }
      } else {
        setReady(true);
      }
      return () => {
        cancelled = true;
      };
    }
  });

  return currentTheme ? (
    children
  ) : (
    <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
  );
}

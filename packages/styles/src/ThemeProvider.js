// @flow
import * as React from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components/macro';
import { useAutoEffect } from 'hooks.macro';

import defaultTheme from './defaultTheme';
import useTheme from './useTheme';

type Props = {
  children: React.Node,
  theme?: any,
};

const ThemeGlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,800');
`;

/**
 * @description Provide a default for an empty theme context.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ThemeProvider({
  children,
  theme = defaultTheme,
}: Props) {
  const [ready, setReady] = React.useState(false);
  useAutoEffect(() => {
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
  });
  return useTheme() ? (
    children
  ) : (
    <>
      <ThemeGlobalStyles />
      {ready && (
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      )}
    </>
  );
}

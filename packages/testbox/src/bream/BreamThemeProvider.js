// @flow
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';

import breamTheme from './breamTheme';

type Props = {
  children?: any,
};

/**
 * @description Bream styled theme provider.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BreamThemeProvider({ children = null }: Props) {
  return (
    <StyledThemeProvider theme={breamTheme}>{children}</StyledThemeProvider>
  );
}

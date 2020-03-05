// @flow
import * as React from 'react';
import { ThemeProvider } from '@seine/styles';

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
  return <ThemeProvider theme={breamTheme}>{children}</ThemeProvider>;
}

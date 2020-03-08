// @flow
import * as React from 'react';
import { ThemeProvider } from '@seine/styles';
import { createGlobalStyle } from 'styled-components/macro';

import breamTheme from './breamTheme';

type Props = {
  children?: any,
};

const ThemeGlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600&amp;subset=cyrillic');
`;

/**
 * @description Bream styled theme provider.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BreamThemeProvider({ children = null }: Props) {
  return (
    <>
      <ThemeGlobalStyles />
      <ThemeProvider theme={breamTheme}>{children}</ThemeProvider>
    </>
  );
}

// @flow
import * as React from 'react';
import { ThemeContext } from 'styled-components/macro';

/**
 * @description Use current theme of styled components.
 * @returns {React.Ref<HTMLElement>}
 */
export default function useTheme() {
  return React.useContext(ThemeContext);
}

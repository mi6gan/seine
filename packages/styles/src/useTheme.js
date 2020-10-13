// @flow
import * as React from 'react';
import { ThemeContext } from 'styled-components/macro';

import type { Theme } from '@seine/styles/mui-core.macro.d';

/**
 * @description Use current theme of styled components.
 * @returns {React.Ref<HTMLElement>}
 */
export default function useTheme(): Theme {
  return React.useContext(ThemeContext);
}

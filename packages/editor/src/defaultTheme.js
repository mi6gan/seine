// @flow
import { createMuiTheme } from '../mui-core-styles.macro';

import { createTheme, deepmerge } from '@seine/styles';

const defaultTheme = deepmerge(createMuiTheme(), createTheme(), {
  clone: false,
});

export default defaultTheme;

// @flow
import { createMuiTheme } from '@seine/styles/mui-core-styles.macro';
import { createTheme, deepmerge } from '@seine/styles';

const defaultTheme = deepmerge(createMuiTheme(), createTheme(), {
  clone: false,
});

export default defaultTheme;

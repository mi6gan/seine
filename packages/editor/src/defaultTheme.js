// @flow
import { createMuiTheme } from '@material-ui/core/styles';
import { createTheme, deepmerge } from '@seine/styles';

const defaultTheme = deepmerge(createMuiTheme(), createTheme(), {
  clone: false,
});

export default defaultTheme;

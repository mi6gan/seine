// @flow
import { defaultTheme } from '@seine/styles';

export type Spacer =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19;

const breamTheme = {
  ...defaultTheme,
  typography: {
    ...defaultTheme.typography,
    body1: defaultTheme.typography.h5,
    body2: defaultTheme.typography.body1,
    h6: defaultTheme.typography.h5,
  },
  bootstrap: {
    primary: '#71A2FF',
    secondary: '#C0D4E2',
    success: '#8ADB96',
    warning: '#FDE876',
    danger: '#FF7171',

    light: '#F7F7F7',

    gray: '#ACBECB',
    dark: '#454544',
    white: '#FFFFFF',
    green: '#8ADB96',
    greenLight: '#DAEBD1',
    yellow: '#FDE876',
    yellowLight: '#FEF1C6',
    red: '#FF7171',
    redLight: '#FFDBDB',

    borderRadius: '.3rem',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    gridColumns: 12,
    gridGutterWidth: 40,

    btnPaddingY: '1.2rem',
    btnPaddingX: '2rem',
    btnLineHeight: '1.2rem',
    btnFontWeight: 500,
    btnBoxShadow: 'none',
    btnDisabledOpacity: 0.65,
    btnActiveBoxShadow: 'none',
    btnLnkDisabledColor: '#ACBECB',

    spacers: {
      1: '0.25rem',
      2: '0.5rem',
      3: '1rem',
      4: '1.5rem',
      5: '2rem',
      6: '2.5rem',
      7: '3rem',
      8: '4rem',
      9: '5rem',
      10: '6rem',
      11: '7rem',
      12: '8rem',
      13: '9rem',
      14: '10rem',
      15: '11rem',
      16: '12rem',
      17: '13rem',
      18: '14rem',
      19: '15rem',
    },
  },
};

export default breamTheme;

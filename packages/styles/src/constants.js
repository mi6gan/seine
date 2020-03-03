export const defaultBreakpoints = {
  keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xlL', 'xxl'],
  values: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1280, xlL: 1340, xxl: 1800 },
};
export const defaultPalette = {
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.1)',
    hoverOpacity: 0.1,
    selected: 'rgba(255, 255, 255, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
  background: {
    paper: '#fff',
    default: '#fafafa',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
};
export const defaultTypography = {
  fontFamily:
    '"Nunito Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightBold: 800,
  fontWeightLight: 300,
  fontWeightMedium: 600,
  fontWeightRegular: 400,
  htmlFontSize: 16,
};
export const defaultThemeOptions = {
  breakpoints: defaultBreakpoints,
  palette: defaultPalette,
  typography: defaultTypography,
};

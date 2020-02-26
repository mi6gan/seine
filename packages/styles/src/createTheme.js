// @flow
import createTypography from './createTypography';
import {
  defaultBreakpoints,
  defaultPalette,
  defaultThemeOptions,
  defaultTypography,
} from './constants';
import createBreakpoints from './createBreakpoints';

/**
 * @description create content theme
 * @param {{breakpoints?: object, palette?: object, typography?: object}} options
 * @returns {{breakpoints: object, palette: object, typography?: object}}
 */
export default function createTheme({
  breakpoints: {
    keys = defaultBreakpoints.keys,
    values = defaultBreakpoints.values,
  } = defaultBreakpoints,
  typography: {
    fontFamily = defaultTypography.fontFamily,
    fontSize = defaultTypography.fontSize,
    fontWeightBold = defaultTypography.fontWeightBold,
    fontWeightMedium = defaultTypography.fontWeightMedium,
    fontWeightRegular = defaultTypography.fontWeightRegular,
    fontWeightLight = defaultTypography.fontWeightLight,
    htmlFontSize = defaultTypography.htmlFontSize,
  } = defaultTypography,
  palette: {
    action = defaultPalette.action,
    background = defaultPalette.background,
    divider = defaultPalette.divider,
    text = defaultPalette.text,
  } = defaultPalette,
} = defaultThemeOptions) {
  const breakpoints = createBreakpoints({ keys, values });
  const palette = {
    action,
    background,
    divider,
    text,
  };
  const typography = createTypography(palette, {
    fontFamily,
    fontSize,
    fontWeightBold,
    fontWeightMedium,
    fontWeightRegular,
    fontWeightLight,
    htmlFontSize,
  });

  return { breakpoints, typography, palette };
}

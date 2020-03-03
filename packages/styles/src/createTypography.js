/* eslint-disable no-console, jsdoc/require-jsdoc, jsdoc/require-description, jsdoc/require-param, jsdoc/require-returns */

import { deepmerge } from './utils';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

/**
 * @see @link{https://material.io/design/typography/the-type-system.html}
 * @see @link{https://material.io/design/typography/understanding-typography.html}
 */
export default function createTypography(palette, typography) {
  const {
    fontFamily,
    // The default font size of the Material Specification.
    fontSize, // px
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize,

    // bootstrap theme variables
    headingsFontWeight = 500,
    headingsLineHeight = 1.5,
    headingsMarginBottom = '0.5em',
    displayLineHeight = 1.5,

    pxToRem = (size) => `${(size / htmlFontSize) * (fontSize / 14)}rem`,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  const headingBase = {
    fontFamily,
    fontWeight: headingsFontWeight,
    marginBottom: headingsMarginBottom,
    lineHeight: headingsLineHeight,
  };

  const displayBase = {
    fontFamily,
    lineHeight: displayLineHeight,
  };

  return deepmerge(
    {
      htmlFontSize,
      pxToRem,
      round, // TODO To remove in v5?
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightBold,
      h1: {
        ...headingBase,
        fontSize: '2.8rem',
      },
      h2: {
        ...headingBase,
        fontSize: '2.4rem',
      },
      h3: {
        ...headingBase,
        fontSize: '1.8rem',
      },
      h4: {
        ...headingBase,
        fontSize: '1.6rem',
      },
      h5: {
        ...headingBase,
        fontSize: '1.4rem',
      },
      h6: {
        ...headingBase,
        fontSize: '1rem',
      },
      subtitle1: {
        ...displayBase,
        fontSize: '1rem',
        lineHeight: displayLineHeight,
      },
      subtitle2: {
        ...displayBase,
        fontSize: '0.8rem',
        lineHeight: displayLineHeight,
      },
      body1: {
        ...displayBase,
        fontSize: '1rem',
        lineHeight: displayLineHeight,
      },
      body2: {
        ...displayBase,
        fontSize: '0.8rem',
        lineHeight: displayLineHeight,
      },
      button: {
        fontFamily,
        fontSize: '1.4rem',
      },
      caption: {
        fontFamily,
        fontSize: '0.8rem',
      },
      overline: {
        fontFamily,
        fontSize: '0.6rem',
        textTransform: 'uppercase',
      },
    },
    other,
    {
      clone: false, // No need to clone deep
    }
  );
}

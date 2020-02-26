import * as React from 'react';
import { defaultTheme, SvgTypography, Typography } from '@seine/styles';
import { ThemeProvider } from 'styled-components/macro';

export default { title: 'Default.Single.SvgText' };

export const HTMLTextInSVG = ({
  children = 'html document text',
  width = '100%',
  ...typographyProps
}) => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <Typography {...typographyProps} width={width}>
        {children}
      </Typography>
      <div style={{ width: '100%', fontWeight: 600 }}>
        should be rendered exactly as
      </div>
      <svg height={'100%'} width={'100%'}>
        <SvgTypography {...typographyProps} width={width}>
          {children}
        </SvgTypography>
      </svg>
    </div>
  </ThemeProvider>
);

export const SVGTextWidthProperty = () => (
  <HTMLTextInSVG width={200}>text width is 200, extra is hidden</HTMLTextInSVG>
);

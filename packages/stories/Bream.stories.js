// @flow
import React from 'react';
import {
  breamTheme,
  SuiteLogsBCGLayout,
  ThemeProvider,
  useBreamStoryEffect,
} from '@seine/styles';

import {
  ContentOfPieAndBarSiblingCharts,
  InitialContent,
} from './Content.stories';

type Props = {
  children?: any,
};

export default { title: 'Bream' };

export const ThemedContent = ({ children, ...contentProps }: Props) => {
  useBreamStoryEffect(...document.children);

  return (
    <ThemeProvider theme={breamTheme}>
      <InitialContent {...contentProps}>{children}</InitialContent>
    </ThemeProvider>
  );
};

export const ThemedContentOfPieAndBarSiblingCharts = ({
  children,
  ...contentProps
}: Props) => (
  <ThemedContent {...contentProps} as={ContentOfPieAndBarSiblingCharts}>
    {children}
  </ThemedContent>
);

export const ThemedContentInBCGLayout = ({
  title = 'BCG layout title',
  subtitle = 'BCG layout subtitle',
  description = 'BCG layout description',
  children = 'BCG layout content',
  ...props
}) => (
  <ThemedContent
    as={SuiteLogsBCGLayout}
    title={title}
    subtitle={subtitle}
    description={description}
    {...props}
  >
    {children}
  </ThemedContent>
);

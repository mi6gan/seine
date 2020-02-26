// @flow
import React from 'react';
import {
  breamTheme,
  SuiteLogsBCGLayout,
  ThemeProvider,
  useBreamStoryEffect,
} from '@seine/styles';

import { BarChart, ColumnChart, LineChart, PieChart } from './Chart.stories';

type Props = {
  children?: any,
};

export default { title: 'Bream' };

const Themed = ({ children }: Props) => {
  useBreamStoryEffect(...document.children);

  return <ThemeProvider theme={breamTheme}>{children}</ThemeProvider>;
};

export const ContentInBCGLayout = ({
  title = 'BCG layout title',
  subtitle = 'BCG layout subtitle',
  description = 'BCG layout description',
  children = 'BCG layout content',
}) => (
  <Themed>
    <SuiteLogsBCGLayout
      title={title}
      subtitle={subtitle}
      description={description}
    >
      {children}
    </SuiteLogsBCGLayout>
  </Themed>
);

export const BarChartInBCGLayout = (props) => (
  <ContentInBCGLayout {...props} description={<BarChart />} />
);

export const ColumnChartInBCGLayout = (props) => (
  <ContentInBCGLayout {...props} description={<ColumnChart />} />
);

export const PieChartInBCGLayout = (props) => (
  <ContentInBCGLayout {...props} description={<PieChart />} />
);

export const LineChartInBCGLayout = (props) => (
  <ContentInBCGLayout {...props} description={<LineChart />} />
);

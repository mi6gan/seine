import * as React from 'react';

import {
  AllCharts,
  FirstSampleChart,
  ColumnAndBarCharts,
  ColumnAndLineCharts,
  LineAndBarCharts,
  PieAndBarCharts,
  Page,
  Flex,
  Table,
  PieChart,
  Text,
} from '../../content/src/Content.stories';

import Editor from './Editor';

export default { title: 'Content' };

export const InitialEditor = () => <Page as={Editor} />;

export const EditorOfTable = () => <Table as={Editor} />;

export const EditorOfText = () => <Text as={Editor} />;

export const EditorOfPieChart = () => <PieChart as={Editor} />;

export const EditorOfPieAndBarSiblingCharts = () => (
  <PieAndBarCharts as={Editor} />
);

export const EditorOfColumnAndBarSiblingCharts = () => (
  <ColumnAndBarCharts as={Editor} />
);

export const EditorOfLineAndBarSiblingCharts = () => (
  <LineAndBarCharts as={Editor} />
);

export const EditorOfColumnAndLineCharts = () => (
  <ColumnAndLineCharts as={Editor} />
);

export const EditorOfAllCharts = () => <AllCharts as={Editor} />;

export const EditorOfChartSampleOne = () => <FirstSampleChart as={Editor} />;

export const EditorOfFlex = () => <Flex as={Editor} />;

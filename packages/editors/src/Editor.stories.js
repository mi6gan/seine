import * as React from 'react';

import {
  ContentOfAllCharts,
  ContentOfChartSampleOne,
  ContentOfColumnAndBarSiblingCharts,
  ContentOfColumnAndLineCharts,
  ContentOfLineAndBarSiblingCharts,
  ContentOfPieAndBarSiblingCharts,
  InitialContent,
} from '../../contents/src/Content.stories';

import Editor from './Editor';

export default { title: 'Editor' };

export const InitialEditor = () => <InitialContent as={Editor} />;

export const EditorOfPieAndBarSiblingCharts = () => (
  <ContentOfPieAndBarSiblingCharts as={Editor} />
);

export const EditorOfColumnAndBarSiblingCharts = () => (
  <ContentOfColumnAndBarSiblingCharts as={Editor} />
);

export const EditorOfLineAndBarSiblingCharts = () => (
  <ContentOfLineAndBarSiblingCharts as={Editor} />
);

export const EditorOfColumnAndLineCharts = () => (
  <ContentOfColumnAndLineCharts as={Editor} />
);

export const EditorOfAllCharts = () => <ContentOfAllCharts as={Editor} />;

export const EditorOfChartSampleOne = () => (
  <ContentOfChartSampleOne as={Editor} />
);

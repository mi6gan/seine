// @flow
import * as React from 'react';
import { actions } from '@storybook/addon-actions';

import {
  Data,
  Flex,
  Image,
  NestedFlex,
  Page,
  Table,
  Text,
  PieChart,
  LineChart,
  ColumnChart,
  BarChart,
  DataV03,
} from './Content.stories';

import { Editor } from '@seine/editor';
import { ThemeProvider } from '@seine/styles';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Docs/Editor',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const InitialEditor = () => (
  <Page as={Editor} {...actions('onChange')} />
);

export const EditorOfTable = () => (
  <Table as={Editor} {...actions('onChange')} />
);

export const EditorOfText = () => <Text as={Editor} {...actions('onChange')} />;

export const EditorOfImage = () => (
  <Image as={Editor} {...actions('onChange')} />
);

export const EditorOfFlex = () => <Flex as={Editor} {...actions('onChange')} />;

export const EditorOfData = () => <Data as={Editor} {...actions('onChange')} />;
EditorOfData.parameters = {
  storyshots: { disable: true },
};

export const EditorOfData_v0_3 = () => (
  <DataV03 as={Editor} {...actions('onChange')} />
);
EditorOfData_v0_3.parameters = {
  storyshots: { disable: true },
};

export const EditorOfNestedFlex = () => (
  <NestedFlex as={Editor} {...actions('onChange')} />
);
EditorOfNestedFlex.parameters = {
  storyshots: { disable: true },
};

export const EditorOfPieChart = () => (
  <PieChart as={Editor} {...actions('onChange')} />
);

export const EditorOfLineChart = () => (
  <LineChart as={Editor} {...actions('onChange')} />
);
EditorOfLineChart.parameters = {
  storyshots: { disable: true },
};

export const EditorOfColumnChart = () => (
  <ColumnChart as={Editor} {...actions('onChange')} />
);

export const EditorOfBarChart = () => (
  <BarChart as={Editor} {...actions('onChange')} />
);

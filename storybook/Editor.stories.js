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
} from './Content.stories';

import { Editor } from '@seine/editor';
import { ThemeProvider } from '@seine/styles';

export default {
  title: 'Development/Editor',
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

export const EditorOfNestedFlex = () => (
  <NestedFlex as={Editor} {...actions('onChange')} />
);

export const EditorOfPieChart = () => (
  <PieChart as={Editor} {...actions('onChange')} />
);

export const EditorOfLineChart = () => (
  <LineChart as={Editor} {...actions('onChange')} />
);

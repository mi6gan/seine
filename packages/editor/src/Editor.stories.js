import * as React from 'react';

import {
  Data,
  Flex,
  NestedFlex,
  Page,
  Table,
  Text,
} from '../../content/src/Content.stories';

import Editor from './Editor';

export default { title: 'Content' };

export const InitialEditor = () => <Page as={Editor} />;

export const EditorOfTable = () => <Table as={Editor} />;

export const EditorOfText = () => <Text as={Editor} />;

export const EditorOfFlex = () => <Flex as={Editor} />;

export const EditorOfData = () => <Data as={Editor} />;

export const EditorOfNestedFlex = () => <NestedFlex as={Editor} />;

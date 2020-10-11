// @flow
import * as React from 'react';

import {
  Data,
  Flex,
  Image,
  NestedFlex,
  Page,
  Table,
  Text,
} from './Content.stories';

import { Editor } from '@seine/editor';

export default { title: 'Editor' };

export const InitialEditor = () => <Page as={Editor} />;

export const EditorOfTable = () => <Table as={Editor} />;

export const EditorOfText = () => <Text as={Editor} />;

export const EditorOfImage = () => <Image as={Editor} />;

export const EditorOfFlex = () => <Flex as={Editor} />;

export const EditorOfData = () => <Data as={Editor} />;

export const EditorOfNestedFlex = () => <NestedFlex as={Editor} />;

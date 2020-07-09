// @flow
import * as React from 'react';
import { blockTypes } from '@seine/core';
import { blockRenderMap as defaultBlockRenderMap, Page } from '@seine/content';
import type { Block, BlockEditor } from '@seine/core';

import { ChartEditor } from './chart';
import { RichTextEditor } from './richtext';
import { TableEditor } from './table';
import FlexEditor from './layout/FlexEditor';
import GridEditor from './layout/GridEditor';

export const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.RICH_TEXT]: RichTextEditor,
  [blockTypes.GRID]: GridEditor,
  [blockTypes.PAGE]: ({
    id,
    addButtonRenderMap,
    dispatch,
    editor,
    selection,
    ...props
  }: BlockEditor & Block) => <Page {...props} />,
  [blockTypes.TABLE]: TableEditor,
  [blockTypes.FLEX]: FlexEditor,
};

export default blockRenderMap;

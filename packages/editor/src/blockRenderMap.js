// @flow
import { blockTypes } from '@seine/core';
import { blockRenderMap as defaultBlockRenderMap } from '@seine/content';

import { ChartEditor } from './chart';
import { RichTextEditor } from './richtext';
import { TableEditor } from './table';
import FlexEditor from './layout/FlexEditor';
import GridEditor from './layout/GridEditor';
import PageEditor from './PageEditor';

export const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.RICH_TEXT]: RichTextEditor,
  [blockTypes.GRID]: GridEditor,
  [blockTypes.PAGE]: PageEditor,
  [blockTypes.TABLE]: TableEditor,
  [blockTypes.FLEX]: FlexEditor,
};

export default blockRenderMap;

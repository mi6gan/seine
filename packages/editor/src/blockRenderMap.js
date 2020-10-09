// @flow

import { ChartEditor } from './chart';
import { RichTextEditor } from './richtext';
import { TableEditor } from './table';
import LayoutEditor from './layout/LayoutEditor';
import PageEditor from './PageEditor';

import { blockRenderMap as defaultBlockRenderMap } from '@seine/content';
import { blockTypes } from '@seine/core';

export const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.RICH_TEXT]: RichTextEditor,
  [blockTypes.PAGE]: PageEditor,
  [blockTypes.TABLE]: TableEditor,
  [blockTypes.LAYOUT]: LayoutEditor,
};

export default blockRenderMap;

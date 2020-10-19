// @flow
import { ChartEditor } from './charts';
import { RichTextEditor } from './richtexts';
import { TableEditor } from './tables';
import { ImageEditor } from './images';

import { blockTypes } from '@seine/core';
import { blockRenderMap as defaultBlockRenderMap } from '@seine/content';

export const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes.IMAGE]: ImageEditor,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.RICH_TEXT]: RichTextEditor,
  [blockTypes.TABLE]: TableEditor,
};

export default blockRenderMap;

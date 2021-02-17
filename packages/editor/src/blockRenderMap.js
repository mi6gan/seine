// @flow
import { ChartEditor } from './charts';
import { RichTextEditor } from './richtexts';
import { TableEditor } from './tables';
import { ImageEditor } from './images';
import PageEditor from './pages/PageEditor';
import PageEditor_v0_3 from './v0.3/PageEditor';
import { ShapeEditor } from './shapes';

import { blockTypes, blockTypes_v0_3 } from '@seine/core';
import { blockRenderMap as defaultBlockRenderMap } from '@seine/content';

export const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes_v0_3.PAGE]: PageEditor_v0_3,
  [blockTypes.PAGE]: PageEditor,
  [blockTypes.IMAGE]: ImageEditor,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.RICH_TEXT]: RichTextEditor,
  [blockTypes.TABLE]: TableEditor,
  [blockTypes.SHAPE]: ShapeEditor,
};

export default blockRenderMap;

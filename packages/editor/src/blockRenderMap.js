// @flow
import { ChartEditor } from './charts';
import { RichTextEditor } from './richtexts';
import { TableEditor } from './tables';
import { ImageEditor } from './images';
import PageEditor from './pages/PageEditor';

import { blockTypes } from '@seine/core';

export const blockRenderMap = {
  [blockTypes.PAGE]: PageEditor,
  [blockTypes.IMAGE]: ImageEditor,
  [blockTypes.CHART]: ChartEditor,
  [blockTypes.RICH_TEXT]: RichTextEditor,
  [blockTypes.TABLE]: TableEditor,
};

export default blockRenderMap;

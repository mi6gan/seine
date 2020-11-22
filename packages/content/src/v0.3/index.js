// @flow
import Image_v0_3 from './Image';
import Layout_v0_3 from './Layout';
import Page_v0_3 from './Page';
import RichText_v0_3 from './RichText';
import Table_v0_3 from './Table';
import Chart_v0_3 from './Chart';

import { blockTypes_v0_3 } from '@seine/core';

export {
  Image_v0_3,
  Layout_v0_3,
  Page_v0_3,
  RichText_v0_3,
  Table_v0_3,
  Chart_v0_3,
};

export const blockRenderMap_v0_3 = {
  [blockTypes_v0_3.IMAGE]: Image_v0_3,
  [blockTypes_v0_3.LAYOUT]: Layout_v0_3,
  [blockTypes_v0_3.PAGE]: Page_v0_3,
  [blockTypes_v0_3.RICH_TEXT]: RichText_v0_3,
  [blockTypes_v0_3.TABLE]: Table_v0_3,
  [blockTypes_v0_3.CHART]: Chart_v0_3,
};

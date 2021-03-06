// @flow
import { Layout } from './layouts';
import { Page } from './pages';
import { Chart } from './charts';
import { Image } from './images';
import { RichText } from './richtexts';
import { Table } from './tables';
import { Shape } from './shapes';

import { blockTypes } from '@seine/core';

const defaultBlockRenderMap = {
  [blockTypes.LAYOUT]: Layout,
  [blockTypes.PAGE]: Page,
  [blockTypes.TABLE]: Table,
  [blockTypes.CHART]: Chart,
  [blockTypes.RICH_TEXT]: RichText,
  [blockTypes.IMAGE]: Image,
  [blockTypes.SHAPE]: Shape,
};

export default defaultBlockRenderMap;

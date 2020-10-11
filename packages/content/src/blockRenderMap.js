// @flow

import { Chart } from './charts';
import { RichText } from './richtexts';
import { Image } from './images';
import { Page } from './pages';
import { Table } from './tables';
import { Layout } from './layouts';

import { blockTypes } from '@seine/core';

const blockRenderMap = {
  [blockTypes.CHART]: Chart,
  [blockTypes.RICH_TEXT]: RichText,
  [blockTypes.IMAGE]: Image,
  [blockTypes.PAGE]: Page,
  [blockTypes.TABLE]: Table,
  [blockTypes.LAYOUT]: Layout,
};

export default blockRenderMap;

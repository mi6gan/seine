// @flow

import { Chart } from './chart';
import { RichText } from './richtext';
import { Image } from './image';
import { Page } from './page';
import { Table } from './table';
import { Layout } from './layout';

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

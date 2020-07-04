// @flow
import { blockTypes } from '@seine/core';

import { Chart } from './chart';
import { RichText } from './richtext';
import { Grid, Flex } from './layout';
import { Image } from './image';
import { Page } from './page';
import { Table } from './table';

const blockRenderMap = {
  [blockTypes.CHART]: Chart,
  [blockTypes.RICH_TEXT]: RichText,
  [blockTypes.GRID]: Grid,
  [blockTypes.FLEX]: Flex,
  [blockTypes.IMAGE]: Image,
  [blockTypes.PAGE]: Page,
  [blockTypes.TABLE]: Table,
};

export default blockRenderMap;

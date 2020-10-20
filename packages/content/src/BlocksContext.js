// @flow
import * as React from 'react';

import type { Block, BlockBody, BlockFormat, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';
import { Chart, Image, Layout, Page, RichText, Table } from '@seine/content';

export type BlocksContextType = {
  blocks: Array<Block>,
  blockRenderMap?: {
    [BlockType]: React.ComponentType<BlockFormat & BlockBody>,
  },
};

const BlocksContext = React.createContext<BlocksContextType>({
  blocks: [],
  blockRenderMap: {
    [blockTypes.LAYOUT]: Layout,
    [blockTypes.PAGE]: Page,
    [blockTypes.TABLE]: Table,
    [blockTypes.CHART]: Chart,
    [blockTypes.RICH_TEXT]: RichText,
    [blockTypes.IMAGE]: Image,
  },
});

export default BlocksContext;

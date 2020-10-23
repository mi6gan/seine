// @flow
import * as React from 'react';

import type { Block, BlockBody, BlockFormat, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';

export type BlocksContextType = {
  blocks: Array<Block>,
  blockRenderMap?: {
    [BlockType]: React.ComponentType<BlockFormat & BlockBody>,
  },
};

const BlocksContext = React.createContext<BlocksContextType>({
  blocks: [],
  blockRenderMap: {
    [blockTypes.LAYOUT]: () => null,
    [blockTypes.PAGE]: () => null,
    [blockTypes.TABLE]: () => null,
    [blockTypes.CHART]: () => null,
    [blockTypes.RICH_TEXT]: () => null,
    [blockTypes.IMAGE]: () => null,
  },
});

export default BlocksContext;

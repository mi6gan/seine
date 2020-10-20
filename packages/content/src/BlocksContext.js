// @flow
import * as React from 'react';

import blockRenderMap from './blockRenderMap';

import type { Block, BlockBody, BlockFormat, BlockType } from '@seine/core';

export type BlocksContextType = {
  blocks: Array<Block>,
  blockRenderMap?: {
    [BlockType]: React.ComponentType<BlockFormat & BlockBody>,
  },
};

const BlocksContext = React.createContext<BlocksContextType>({
  blocks: [],
  blockRenderMap,
});

export default BlocksContext;

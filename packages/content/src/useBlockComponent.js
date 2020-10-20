// @flow
import * as React from 'react';

import BlocksContext from './BlocksContext';

import type { BlockType } from '@seine/core';

// eslint-disable-next-line
export default function useBlockComponent(type: BlockType) {
  const { blockRenderMap } = React.useContext(BlocksContext);
  return blockRenderMap[type];
}

// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import BlocksContext from './BlocksContext';

import type { BlockId } from '@seine/core';

// eslint-disable-next-line
export default function useBlock(id: BlockId) {
  const { blocks } = React.useContext(BlocksContext);
  return useAutoMemo(blocks.find((block) => block.id === id));
}

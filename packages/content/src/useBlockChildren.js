// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import BlocksContext from './BlocksContext';

import type { BlockId } from '@seine/core';
import { isBlockContainer } from '@seine/core';

// eslint-disable-next-line
export default function useBlockChildren(id: BlockId) {
  const { blocks } = React.useContext(BlocksContext);
  return useAutoMemo(
    blocks.some((block) => block.id === id && isBlockContainer(block))
      ? blocks.filter((block) => block['parent_id'] === id)
      : []
  );
}

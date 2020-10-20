// @flow
import * as React from 'react';

import BlocksContext from './BlocksContext';

import type { BlockId } from '@seine/core';

// eslint-disable-next-line
export default function useBlockChildren(id: BlockId) {
  const { blocks } = React.useContext(BlocksContext);
  return blocks.filter((block) => block['parent_id'] === id);
}

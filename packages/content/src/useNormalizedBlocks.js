// @flow
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import type { Block, ScreenDevice } from '@seine/core';
import { normalizeBlock } from '@seine/core';

// eslint-disable-next-line
export default function useNormalizedBlocks(
  blocks: Block[],
  device: ?ScreenDevice = 'any'
): Block[] {
  const normalize = useAutoCallback((block) => normalizeBlock(block, device));
  return useAutoMemo(blocks.map(normalize));
}

// @flow
import type { BlockType } from '@seine/core/src/types';

import { useEditorSelector } from './index';

// eslint-disable-next-line
export default function useSelectedBlock(type: BlockType = null) {
  const { blocks, selection } = useEditorSelector();
  const selectedBlocks = blocks.filter(
    (block) =>
      selection.includes(block.id) && (type === null || block.type === type)
  );
  return selectedBlocks[0];
}

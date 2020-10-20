// @flow
import { useAutoCallback } from 'hooks.macro';

import { useBlocksSelector } from '@seine/editor';
import { blockTypes } from '@seine/core';

// eslint-disable-next-line
export default function useSelectedLayoutIds() {
  return useBlocksSelector(
    useAutoCallback(({ selection, blocks }) =>
      selection.filter((id) =>
        blocks.some(
          (block) => id === block.id && block.type === blockTypes.LAYOUT
        )
      )
    )
  );
}

// @flow
import { useAutoCallback } from 'hooks.macro';

import { useEditorSelector } from '@seine/editor';
import { isBlockContainer } from '@seine/core';

// eslint-disable-next-line
export default function useSelectedLayoutIds() {
  return useEditorSelector(
    useAutoCallback(({ selection, blocks }) =>
      selection.filter((id) =>
        blocks.some((block) => id === block.id && isBlockContainer(block))
      )
    )
  );
}

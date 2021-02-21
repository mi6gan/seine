// @flow
import { useAutoCallback } from 'hooks.macro';

import { useEditorSelector } from '../blocks';

import { isBlockContainer } from '@seine/core';

// eslint-disable-next-line
export default function useSelectedContainerIds() {
  return useEditorSelector(
    useAutoCallback(({ selection, blocks }) =>
      selection.filter((id) =>
        blocks.some(
          (block) =>
            id === block.id &&
            isBlockContainer(block) &&
            !/^.+\//.test(block.type)
        )
      )
    )
  );
}

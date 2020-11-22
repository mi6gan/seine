// @flow
import { useAutoEffect } from 'hooks.macro';

import { allBlocksSelector, useEditorSelector } from './blocks';

import type { Block } from '@seine/core';

// eslint-disable-next-line
export default function useBlocksChange(onChange: (Block[]) => void) {
  const blocks = useEditorSelector(allBlocksSelector);
  return useAutoEffect(() => {
    onChange(
      // no extra data should be passed, like `editor` key value
      blocks.map(({ id, type, body, format, parent_id }) => ({
        id,
        type: type.replace(/^.+\//, ''),
        body,
        format,
        parent_id,
      }))
    );
  });
}

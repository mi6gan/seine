// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import { useBlocksSelector } from '@seine/editor';
import { blockTypes } from '@seine/core';

/**
 * @description Use layout items list from current selection.
 * @returns {React.Node}
 */
export default function useSelectedLayoutItems() {
  const blocks = useBlocksSelector();

  const layouts = useAutoMemo(
    blocks.filter(({ type }) => type === blockTypes.LAYOUT)
  );
  const items = useAutoMemo(
    layouts.length
      ? blocks.filter((block) =>
          layouts.some(({ id }) => id === block['parent_id'])
        )
      : blocks
  );

  return {
    layouts,
    items,
    layout: layouts.length === 1 ? layouts[0] : null,
    item:
      items.length === 1 ? items[0] : layouts.length > 0 ? layouts[0] : null,
  };
}

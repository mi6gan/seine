// @flow
import { useAutoMemo } from 'hooks.macro';

import { defaultEditorSelector, useEditorSelector } from '../blocks';

import { blockTypes, isBlockContainer } from '@seine/core';

// eslint-disable-next-line
export default function useSelectedLayoutItems(obsolete = false) {
  const blocks = useEditorSelector((state) =>
    defaultEditorSelector(state).filter(
      ({ type }) => obsolete || !/^.+\//.test(type)
    )
  );
  const layouts = useAutoMemo(blocks.filter(isBlockContainer));
  const items = useAutoMemo(
    layouts.length
      ? blocks.filter((block) =>
          layouts.some(({ id }) => id === block['parent_id'])
        )
      : blocks
  );

  return useAutoMemo({
    layouts,
    items,
    layout: layouts[0] || null,
    item:
      items.length === 1 && layouts.length
        ? layouts[0].type === blockTypes.PAGE
          ? layouts[0]
          : items[0]
        : layouts.length > 0
        ? layouts[0]
        : items.length
        ? items[0]
        : null,
  });
}

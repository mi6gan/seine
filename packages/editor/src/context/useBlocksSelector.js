// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import EditorContext from './EditorContext';

export const defaultBlocksSelector = ({ blocks, selection }) =>
  blocks.filter((block) =>
    selection.some((id) => id === block.id || id === block['parent_id'])
  );

// eslint-disable-next-line
export default function useBlocksSelector(selector = defaultBlocksSelector) {
  const { state } = React.useContext(EditorContext);
  return useAutoMemo(selector(state));
}

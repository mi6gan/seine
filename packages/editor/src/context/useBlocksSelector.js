// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import EditorContext from './EditorContext';

export const defaultBlocksSelector = ({ blocks, selection }) =>
  blocks.reduce(
    (acc, block) =>
      selection.includes(block.id) ||
      acc.find((parent) => block['parent_id'] === parent.id)
        ? [...acc, block]
        : acc,
    []
  );

// eslint-disable-next-line
export default function useBlocksSelector(selector = defaultBlocksSelector) {
  const { state } = React.useContext(EditorContext);
  return useAutoMemo(selector(state));
}

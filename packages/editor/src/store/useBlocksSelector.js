// @flow
import { useContext } from 'react';

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
  const { state } = useContext(EditorContext);
  return selector(state);
}

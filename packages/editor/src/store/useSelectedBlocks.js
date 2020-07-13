// @flow
import useEditorSelector from './useEditorSelector';

// eslint-disable-next-line
export default function useSelectedBlocks() {
  const { blocks, selection } = useEditorSelector();
  return blocks.reduce(
    (acc, block) =>
      selection.includes(block.id) ||
      acc.find((parent) => block['parent_id'] === parent.id)
        ? [...acc, block]
        : acc,
    []
  );
}

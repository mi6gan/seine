// @flow
import useEditorSelector from './useEditorSelector';

// eslint-disable-next-line
export default function useSelectedBlock() {
  const { blocks, selection } = useEditorSelector();
  const selectedBlocks = blocks.filter((block) => selection.includes(block.id));
  return selectedBlocks[0];
}

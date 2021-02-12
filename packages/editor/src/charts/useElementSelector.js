// @flow
import { useAutoMemo } from 'hooks.macro';

import { useSelectedLayoutItems } from '../layouts';

const elementSelector = (block) => {
  const selection = block && block.editor && block.editor.selection;
  const elements = block && block.body && block.body.elements;
  return {
    selection,
    element:
      (selection >= 0 && elements.find((_, index) => index === selection)) ||
      null,
  };
};

// eslint-disable-next-line
export default function useElementSelector() {
  const { item: block } = useSelectedLayoutItems();
  return useAutoMemo(elementSelector(block));
}

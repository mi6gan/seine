// @flow
import { useAutoMemo } from 'hooks.macro';

import { defaultBlocksSelector } from '../blocks';

import useChartBlock from './useChartBlock';

const elementSelector = (block) => {
  const selection = block && block.editor && block.editor.selection;
  const elements = block && block.body && block.body.elements;
  return {
    selection,
    element:
      selection >= 0
        ? elements.find(({ id }, index) => index === selection)
        : null,
  };
};

// eslint-disable-next-line
export default function useElementSelector(selector = defaultBlocksSelector) {
  const block = useChartBlock(selector);
  return useAutoMemo(elementSelector(block));
}

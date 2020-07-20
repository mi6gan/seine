// @flow
import { useAutoMemo } from 'hooks.macro';

import useChartBlock from '../chart/useChartBlock';

// eslint-disable-next-line
export default function useSelectedBlockElement() {
  const block = useChartBlock();
  const selection = block && block.editor && block.editor.selection;
  const elements = block && block.body && block.body.elements;
  return useAutoMemo({
    selection,
    element:
      selection >= 0
        ? elements.find(({ id }, index) => index === selection)
        : null,
  });
}

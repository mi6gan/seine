// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import EditorContext from './EditorContext';

export const defaultEditorSelector = ({ blocks, selection }) =>
  blocks.filter((block) => selection.some((id) => id === block.id));

// eslint-disable-next-line
export default function useEditorSelector(selector = defaultEditorSelector) {
  const { state } = React.useContext(EditorContext);
  return useAutoMemo(selector(state));
}

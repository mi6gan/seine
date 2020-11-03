// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import EditorContext from './EditorContext';

import type { State } from '@seine/core';

export const defaultEditorSelector = ({ blocks, selection }) =>
  blocks.filter((block) => selection.some((id) => id === block.id));

// eslint-disable-next-line
export default function useEditorSelector<T: any>(
  selector: ?(State) => T = defaultEditorSelector
) {
  const { state } = React.useContext(EditorContext);
  return useAutoMemo(selector(state));
}

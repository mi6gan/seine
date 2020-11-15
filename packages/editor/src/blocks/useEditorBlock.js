// @flow
import { useAutoMemo } from 'hooks.macro';

import useEditorSelector from './useEditorSelector';
import { deviceSelector } from './selectors';

import { normalizeBlock } from '@seine/core';

// eslint-disable-next-line
export default function useEditorBlock(blockSelector) {
  const block = useEditorSelector(blockSelector);
  const device = useEditorSelector(deviceSelector);
  return useAutoMemo(normalizeBlock(block, device));
}

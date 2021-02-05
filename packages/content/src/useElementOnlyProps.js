// @flow
import { useAutoMemo } from 'hooks.macro';

import type { Block } from '@seine/core';

// eslint-disable-next-line
export default function useElementOnlyProps(props, blockProps): Block[] {
  return useAutoMemo(
    Object.entries(props)
      .filter(([k]) => !(k === 'theme' || k in blockProps))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
  );
}

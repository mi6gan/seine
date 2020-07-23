// @flow
import * as React from 'react';

import EditorContext from './EditorContext';

// eslint-disable-next-line
export default function useBlocksBuffer() {
  const { buffer } = React.useContext(EditorContext);
  return buffer;
}

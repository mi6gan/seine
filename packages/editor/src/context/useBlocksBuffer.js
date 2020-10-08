// @flow
import * as React from 'react';

import BlocksContext from './BlocksContext';

// eslint-disable-next-line
export default function useBlocksBuffer() {
  const { buffer } = React.useContext(BlocksContext);
  return buffer;
}

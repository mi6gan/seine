// @flow
import * as React from 'react';

import BlocksContext from './BlocksContext';

// eslint-disable-next-line
export default function useBlocksDispatch() {
  const { dispatch } = React.useContext(BlocksContext);
  return dispatch;
}

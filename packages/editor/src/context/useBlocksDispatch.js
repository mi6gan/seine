// @flow
import * as React from 'react';

import EditorContext from './EditorContext';

// eslint-disable-next-line
export default function useBlocksDispatch() {
  const { dispatch } = React.useContext(EditorContext);
  return dispatch;
}

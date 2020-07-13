// @flow
import * as React from 'react';

import EditorContext from './EditorContext';

// eslint-disable-next-line
export default function useEditorDispatch() {
  const { dispatch } = React.useContext(EditorContext);
  return dispatch;
}

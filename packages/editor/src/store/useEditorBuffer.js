// @flow
import * as React from 'react';

import EditorContext from './EditorContext';

// eslint-disable-next-line
export default function useEditorBuffer() {
  const { buffer } = React.useContext(EditorContext);
  return buffer;
}

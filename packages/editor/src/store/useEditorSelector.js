// @flow
import { useContext } from 'react';

import EditorContext from './EditorContext';

const defaultSelector = (state) => state;

// eslint-disable-next-line
export default function useEditorSelector(selector = defaultSelector) {
  return selector(useContext(EditorContext).state);
}

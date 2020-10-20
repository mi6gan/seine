// @flow
import * as React from 'react';
import { EditorState } from 'draft-js';

export type RichTextState = {
  editorState: EditorState,
  onChange: (state) => any,
};

const RichTextContext = React.createContext<RichTextState>({
  editorState: EditorState.createWithText(''),
  onChange: () => void 0,
});

export default RichTextContext;

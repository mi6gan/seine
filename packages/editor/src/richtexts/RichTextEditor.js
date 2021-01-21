// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import styled from 'styled-components/macro';

import { Frame } from '../ui';
import { useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';
import { ItemMenuContext } from '../EditorItemMenu';

import type { BlockEditor, RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';
import { defaultDraftBody, defaultDraftFormat, RichText } from '@seine/content';

type Props = (RichTextBody & RichTextFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const StyledFrame = styled(Frame)`
  .DraftEditor-root {
    cursor: text;
  }
`;

export const defaultDraftEditor = {
  state: null,
};

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
const RichTextEditor = React.forwardRef(function RichTextEditor(
  {
    id,
    editor: { state = defaultDraftEditor.state } = defaultDraftEditor,
    blocks = defaultDraftBody.blocks,
    entityMap = defaultDraftBody.entityMap,
    textAlignment = defaultDraftFormat.textAlignment,
    ...itemProps
  }: Props,
  ref
) {
  const { item } = useSelectedLayoutItems();
  const itemMenu = React.useContext(ItemMenuContext);
  const selected = !!(item && item.id === id);
  const dispatch = useBlocksDispatch();

  const editorRef = React.useRef(null);

  const editorState = React.useMemo(
    () =>
      state ||
      EditorState.createWithContent(
        convertFromRaw({
          blocks,
          entityMap,
        })
      ),
    // eslint-disable-next-line
    [id, state]
  );

  useAutoEffect(() => {
    const { current } = editorRef;
    if (
      editorState &&
      selected &&
      current &&
      !(
        document.activeElement &&
        (document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLSelectElement ||
          ['presentation', 'option'].some((value) =>
            (document.activeElement.getAttribute('role') || '')
              .split(' ')
              .includes(value)
          ) ||
          [...document.activeElement.classList].some(
            (className) => className === 'MuiMenu-paper'
          ))
      )
    ) {
      current.focus();
    }
  });

  React.useEffect(() => {
    if (editorState && !selected) {
      dispatch({
        id,
        type: UPDATE_BLOCK_BODY,
        body: convertToRaw(editorState.getCurrentContent()),
      });
    }
    // eslint-disable-next-line
  }, [selected]);

  return (
    <RichText
      {...itemProps}
      id={id}
      ref={editorRef}
      itemRef={ref}
      forwardedAs={StyledFrame}
      selected={selected}
      textAlignment={textAlignment}
      editorState={editorState}
      onChange={useAutoCallback((state) =>
        dispatch({
          id,
          type: UPDATE_BLOCK_EDITOR,
          editor: { state },
        })
      )}
      onContextMenu={useAutoCallback((event) => {
        event.preventDefault();
        itemMenu.open(event.currentTarget);
      })}
      readOnly={!selected}
    />
  );
});

export default RichTextEditor;

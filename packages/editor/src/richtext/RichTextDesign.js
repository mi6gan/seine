// @flow
import * as React from 'react';
import {
  AlignBlockCenterButton,
  AlignBlockLeftButton,
  AlignBlockRightButton,
  BoldButton,
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from 'draft-js-buttons';
import { Box, IconButton } from '@material-ui/core';
import type { RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_EDITOR, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultDraftFormat } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';

import { defaultDraftEditor } from './RichTextEditor';

type Props = {
  body: RichTextBody,
  format: RichTextFormat,
};

const DraftButton = styled(IconButton).attrs(({ className }) => ({
  theme: { button: className },
}))`
  width: 2em;
  svg {
    fill: currentColor;
  }
`;

/**
 * @description Rich text design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function RichTextDesign({
  format = defaultDraftFormat,
  editor: {
    state: editorState = defaultDraftEditor.state,
  } = defaultDraftEditor,
  dispatch,
}: Props) {
  const draftFormProps = {
    as: DraftButton,

    editorState,
    getEditorState: useAutoCallback(() => editorState),
    setEditorState: useAutoCallback((state) =>
      dispatch({
        type: UPDATE_BLOCK_EDITOR,
        editor: { state },
      })
    ),
    alignment:
      (format && format.textAlignment) || defaultDraftFormat.textAlignment,
    setAlignment: useAutoCallback(({ alignment: textAlignment }) =>
      dispatch({
        type: UPDATE_BLOCK_FORMAT,
        format: { textAlignment },
      })
    ),
  };

  return (
    <>
      <SidebarHeading>Text</SidebarHeading>
      <SidebarSection>
        {editorState && (
          <>
            <Box display={'flex'}>
              <Box display={'flex'} mr={3}>
                <DraftButton {...draftFormProps} component={BoldButton} />
                <DraftButton {...draftFormProps} component={ItalicButton} />
                <DraftButton {...draftFormProps} component={UnderlineButton} />
              </Box>

              <Box display={'flex'}>
                <DraftButton
                  {...draftFormProps}
                  component={HeadlineOneButton}
                />
                <DraftButton
                  {...draftFormProps}
                  component={HeadlineTwoButton}
                />
                <DraftButton
                  {...draftFormProps}
                  component={HeadlineThreeButton}
                />
              </Box>
            </Box>

            <Box display={'flex'}>
              <Box display={'flex'} mr={3}>
                <DraftButton
                  {...draftFormProps}
                  component={OrderedListButton}
                />
                <DraftButton
                  {...draftFormProps}
                  component={UnorderedListButton}
                />
              </Box>

              <Box display={'flex'}>
                <DraftButton
                  {...draftFormProps}
                  component={AlignBlockLeftButton}
                />
                <DraftButton
                  {...draftFormProps}
                  component={AlignBlockCenterButton}
                />
                <DraftButton
                  {...draftFormProps}
                  component={AlignBlockRightButton}
                />
              </Box>
            </Box>
          </>
        )}
      </SidebarSection>
    </>
  );
}

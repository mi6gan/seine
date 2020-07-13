// @flow
import * as React from 'react';
import { RichUtils } from 'draft-js';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
} from '@material-ui/icons';
import { InputLabel, SvgIcon } from '@material-ui/core';
import { UPDATE_BLOCK_EDITOR, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { defaultDraftFormat } from '@seine/content';
import styled from 'styled-components/macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import ToolbarToggleButtonGroup from '../ui/ToolbarToggleButtonGroup';
import ToolbarToggleButton from '../ui/ToolbarToggleButton';
import { useEditorDispatch, useEditorSelector } from '../context';
import useSelectedBlock from '../context/useSelectedBlock';

import { defaultDraftEditor } from './RichTextEditor';

const SvgText = styled.text.attrs({
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fontSize: '1rem',
  fontWeight: 600,
  x: '50%',
  y: '50%',
})``;

/**
 * @description Rich text design panel.
 * @returns {React.Node}
 */
export default function RichTextDesign() {
  const textAlignment = useEditorSelector(
    ({ format = defaultDraftFormat }) =>
      format.textAlignment || defaultDraftFormat.textAlignment
  );
  const {
    editor: {
      state: editorState = defaultDraftEditor.state,
    } = defaultDraftEditor,
  } = useSelectedBlock();
  const dispatch = useEditorDispatch();
  return (
    <>
      <SidebarHeading>Text</SidebarHeading>
      <SidebarSection>
        <InputLabel shrink>Style</InputLabel>
        <ToolbarToggleButtonGroup
          value={useAutoMemo(
            editorState ? [...editorState.getCurrentInlineStyle()] : []
          )}
          onChange={useAutoCallback((event, style) => {
            dispatch({
              type: UPDATE_BLOCK_EDITOR,
              editor: {
                state: RichUtils.toggleInlineStyle(editorState, style),
              },
            });
          })}
        >
          <ToolbarToggleButton value={'BOLD'}>
            <FormatBold />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'ITALIC'}>
            <FormatItalic />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'UNDERLINE'}>
            <FormatUnderlined />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>

        <InputLabel shrink>Alignment</InputLabel>
        <ToolbarToggleButtonGroup
          value={textAlignment}
          onChange={useAutoCallback((event, textAlignment) => {
            event.preventDefault();
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: { textAlignment },
            });
          })}
        >
          <ToolbarToggleButton value={'left'}>
            <FormatAlignLeft />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <FormatAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'right'}>
            <FormatAlignRight />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>

        <InputLabel shrink>Variant</InputLabel>
        <ToolbarToggleButtonGroup
          value={useAutoMemo(
            editorState &&
              editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getType()
          )}
          onChange={useAutoCallback((event, blockType) => {
            dispatch({
              type: UPDATE_BLOCK_EDITOR,
              editor: {
                state: RichUtils.toggleBlockType(editorState, blockType),
              },
            });
          })}
        >
          <ToolbarToggleButton value={'header-one'}>
            <SvgIcon>
              <SvgText>H1</SvgText>
            </SvgIcon>
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'header-two'}>
            <SvgIcon>
              <SvgText>H2</SvgText>
            </SvgIcon>
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'header-three'}>
            <SvgIcon>
              <SvgText>H3</SvgText>
            </SvgIcon>
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'ordered-list-item'}>
            <FormatListBulleted />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'unordered-list-item'}>
            <FormatListNumbered />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarSection>
    </>
  );
}

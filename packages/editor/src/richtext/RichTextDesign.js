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
import { SvgIcon } from '@material-ui/core';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import ToolbarToggleButtonGroup from '../ui/ToolbarToggleButtonGroup';
import ToolbarToggleButton from '../ui/ToolbarToggleButton';
import { useBlocksDispatch, useBlocksSelector } from '../context';
import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';

import { defaultDraftEditor } from './RichTextEditor';

import { defaultDraftFormat } from '@seine/content';
import {
  blockTypes,
  UPDATE_BLOCK_EDITOR,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

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
  const textAlignment = useBlocksSelector(
    ({ format = defaultDraftFormat }) =>
      (format && format.textAlignment) || defaultDraftFormat.textAlignment
  );
  const {
    editor: {
      state: editorState = defaultDraftEditor.state,
    } = defaultDraftEditor,
  } =
    useBlocksSelector().find(({ type }) => type === blockTypes.RICH_TEXT) || {};
  const dispatch = useBlocksDispatch();

  const blockType = useAutoMemo(
    editorState &&
      editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType()
  );
  const toggleBlockType = useAutoCallback((event, blockType) => {
    dispatch({
      type: UPDATE_BLOCK_EDITOR,
      editor: {
        state: RichUtils.toggleBlockType(editorState, blockType),
      },
    });
  });

  return (
    <SidebarSection>
      <SidebarHeading>Rich text</SidebarHeading>
      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>heading</SidebarLabel>
        <ToolbarToggleButtonGroup value={blockType} onChange={toggleBlockType}>
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
        </ToolbarToggleButtonGroup>
      </SidebarGroup>
      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>&nbsp;</SidebarLabel>
        <ToolbarToggleButtonGroup value={blockType} onChange={toggleBlockType}>
          <ToolbarToggleButton value={'header-four'}>
            <SvgIcon>
              <SvgText>H4</SvgText>
            </SvgIcon>
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'header-five'}>
            <SvgIcon>
              <SvgText>H5</SvgText>
            </SvgIcon>
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>list</SidebarLabel>
        <ToolbarToggleButtonGroup value={blockType} onChange={toggleBlockType}>
          <ToolbarToggleButton value={'ordered-list-item'}>
            <FormatListNumbered />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'unordered-list-item'}>
            <FormatListBulleted />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>style</SidebarLabel>
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
      </SidebarGroup>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>alignment</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={textAlignment}
          onChange={useAutoCallback((event, textAlignment) => {
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
      </SidebarGroup>
    </SidebarSection>
  );
}

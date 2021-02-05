// @flow
import * as React from 'react';
import { RichUtils } from 'draft-js';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarLabel,
  SidebarSection,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import { defaultDraftEditor } from './RichTextEditor';

import { SvgIcon } from '@seine/styles/mui-core.macro';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
} from '@seine/styles/mui-icons.macro';
import { UPDATE_BLOCK_EDITOR, UPDATE_BLOCK_FORMAT } from '@seine/core';

const SvgText = styled.text.attrs({
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fontSize: '1rem',
  fontWeight: 600,
  x: '50%',
  y: '50%',
})``;

type Props = {
  toggleAs?: React.ComponentType,
  toggleButtonAs?: React.ComponentType,
};

/**
 * @description Rich text design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function RichTextDesign({
  toggleAs: ToggleButtonGroup = ToolbarToggleButtonGroup,
  toggleButtonAs: ToggleButton = ToolbarToggleButton,
}: Props) {
  const {
    item: {
      id,
      format: { textAlignment },
      editor: {
        state: editorState = defaultDraftEditor.state,
      } = defaultDraftEditor,
    },
  } = useSelectedLayoutItems();

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
      id,
      type: UPDATE_BLOCK_EDITOR,
      editor: {
        state: RichUtils.toggleBlockType(editorState, blockType),
      },
    });
  });

  return (
    <SidebarSection>
      <SidebarHeading>Rich text</SidebarHeading>
      <SidebarGroup>
        <SidebarLabel>heading</SidebarLabel>
        <ToggleButtonGroup
          value={blockType}
          onChange={toggleBlockType}
          name={'header'}
        >
          <ToggleButton name={'header'} value={'header-one'}>
            <SvgIcon>
              <SvgText>H1</SvgText>
            </SvgIcon>
          </ToggleButton>

          <ToggleButton name={'header'} value={'header-two'}>
            <SvgIcon>
              <SvgText>H2</SvgText>
            </SvgIcon>
          </ToggleButton>

          <ToggleButton name={'header'} value={'header-three'}>
            <SvgIcon>
              <SvgText>H3</SvgText>
            </SvgIcon>
          </ToggleButton>
        </ToggleButtonGroup>
      </SidebarGroup>
      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>&nbsp;</SidebarLabel>
        <ToolbarToggleButtonGroup value={blockType} onChange={toggleBlockType}>
          <ToggleButton value={'header-four'}>
            <SvgIcon>
              <SvgText>H4</SvgText>
            </SvgIcon>
          </ToggleButton>

          <ToggleButton value={'header-five'}>
            <SvgIcon>
              <SvgText>H5</SvgText>
            </SvgIcon>
          </ToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>list</SidebarLabel>
        <ToggleButtonGroup
          value={blockType}
          onChange={toggleBlockType}
          name={'list'}
        >
          <ToggleButton value={'ordered-list-item'}>
            <FormatListNumbered />
          </ToggleButton>

          <ToggleButton value={'unordered-list-item'}>
            <FormatListBulleted />
          </ToggleButton>
        </ToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>style</SidebarLabel>
        <ToggleButtonGroup
          value={useAutoMemo(
            editorState ? [...editorState.getCurrentInlineStyle()] : []
          )}
          onChange={useAutoCallback((event, style) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_EDITOR,
              editor: {
                state: RichUtils.toggleInlineStyle(editorState, style),
              },
            });
          })}
          name={'weight'}
        >
          <ToggleButton value={'BOLD'}>
            <FormatBold />
          </ToggleButton>

          <ToggleButton value={'ITALIC'}>
            <FormatItalic />
          </ToggleButton>

          <ToggleButton value={'UNDERLINE'}>
            <FormatUnderlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>alignment</SidebarLabel>
        <ToggleButtonGroup
          value={textAlignment}
          onChange={useAutoCallback((event, textAlignment) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: { textAlignment },
            });
          })}
          name={'alignment'}
        >
          <ToggleButton value={'left'}>
            <FormatAlignLeft />
          </ToggleButton>

          <ToggleButton value={'center'}>
            <FormatAlignCenter />
          </ToggleButton>

          <ToggleButton value={'right'}>
            <FormatAlignRight />
          </ToggleButton>
        </ToggleButtonGroup>
      </SidebarGroup>
    </SidebarSection>
  );
}

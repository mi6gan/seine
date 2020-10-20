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

import RichTextContext from './RichTextContext';

import { SvgIcon } from '@seine/styles/mui-core.macro';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
} from '@seine/styles/mui-icons.macro';

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
  const { editorState, onChange } = React.useContext(RichTextContext);
  const blockType = useAutoMemo(
    editorState &&
      editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType()
  );
  const toggleBlockType = useAutoCallback((event, blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  });

  return (
    <SidebarSection>
      <SidebarHeading>Rich text</SidebarHeading>

      <SidebarGroup>
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

      <SidebarGroup>
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

      <SidebarGroup>
        <SidebarLabel>style</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={useAutoMemo(
            editorState ? [...editorState.getCurrentInlineStyle()] : []
          )}
          onChange={useAutoCallback((event, style) => {
            event.preventDefault();
            event.stopPropagation();
            onChange(RichUtils.toggleInlineStyle(editorState, style));
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
    </SidebarSection>
  );
}

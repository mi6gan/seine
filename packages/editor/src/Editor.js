// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import styled from 'styled-components/macro';

import EditorItemMenu, { ItemMenuProvider } from './EditorItemMenu';
import DefaultEditorDesign from './EditorDesign';
import EditorToolbar from './EditorToolbar';
import EditorTree from './EditorTree';
import defaultTheme from './defaultTheme';
import {
  DeleteConfirmationDialog,
  Sidebar,
  SidebarGroup,
  SidebarHeading,
  SidebarSection,
} from './ui';
import defaultBlockRenderMap from './blockRenderMap';
import {
  allBlocksSelector,
  EditorProvider,
  deviceSelector,
  useBlocksDispatch,
  useEditorSelector,
} from './blocks';
import { ClipboardProvider } from './clipboard';

import { Paper } from '@seine/styles/mui-core.macro';
import { Box, ThemeProvider } from '@seine/styles';
import type { Block, BlockType } from '@seine/core';
import { blockTypes, createBlock, DESELECT_ALL_BLOCKS } from '@seine/core';
import { Content } from '@seine/content';

const Contents = styled(Box).attrs({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})`
  overflow: auto;
`;

const EditorPaper = styled(Paper).attrs({
  square: true,
  component: Box,
  height: 600,
  m: 10,
  p: 0,
})`
  overflow: auto;
  overflow-x: hidden;
  ${({ device, theme }) => ({
    width: device === 'mobile' ? theme.breakpoints.width('sm') : '100%',
    maxWidth: theme.breakpoints.width('xl'),
    minWidth:
      device === 'mobile'
        ? theme.breakpoints.width('sm')
        : theme.breakpoints.width('lg'),
  })}
`;

type Props = {
  onChange: (Block[]) => any,
  blockRenderMap?: (BlockType) => React.Node,
  editorDesignAs?: React.ComponentType,
};

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
function DefaultEditor({
  onChange,
  blockRenderMap = defaultBlockRenderMap,
  editorDesignAs: EditorDesign = DefaultEditorDesign,
}: Props) {
  const dispatch = useBlocksDispatch();
  const blocks = useEditorSelector(allBlocksSelector);
  const device = useEditorSelector(deviceSelector);

  useAutoEffect(() => {
    onChange(
      // no extra data should be passed, like `editor` key value
      blocks.map(({ id, type, body, format, parent_id }) => ({
        id,
        type,
        body,
        format,
        parent_id,
      }))
    );
  });

  return (
    <>
      <DeleteConfirmationDialog />
      <EditorItemMenu />
      <EditorToolbar />

      <Box
        onClick={useAutoCallback(() => {
          dispatch({ type: DESELECT_ALL_BLOCKS });
        })}
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        bgcolor={'grey.300'}
        position={'relative'}
        height={'100%'}
      >
        <Contents>
          <Sidebar open anchor={'left'}>
            <SidebarSection>
              <SidebarHeading>Structure</SidebarHeading>
              <SidebarGroup>
                <EditorTree />
              </SidebarGroup>
            </SidebarSection>
          </Sidebar>

          <Box width={1} overflow={'auto'}>
            <Box
              width={'300vw'}
              display={'flex'}
              justifyContent={'space-around'}
            >
              <EditorPaper
                device={device}
                ref={useAutoCallback((element) => {
                  element.scrollIntoView({
                    block: 'center',
                    inline: 'center',
                  });
                })}
              >
                <Content device={device} blockRenderMap={blockRenderMap}>
                  {blocks}
                </Content>
              </EditorPaper>
            </Box>
          </Box>

          <Sidebar
            open
            anchor={'right'}
            onClick={useAutoCallback((event) => {
              event.stopPropagation();
            })}
          >
            <EditorDesign />
          </Sidebar>
        </Contents>
      </Box>
    </>
  );
}

const defaultEditorChildren = [createBlock(blockTypes.PAGE)];

// eslint-disable-next-line
export default function Editor({
  children = defaultEditorChildren,
  ...editorProps
}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <EditorProvider blocks={children}>
        <ClipboardProvider>
          <ItemMenuProvider>
            <DefaultEditor {...editorProps} />
          </ItemMenuProvider>
        </ClipboardProvider>
      </EditorProvider>
    </ThemeProvider>
  );
}

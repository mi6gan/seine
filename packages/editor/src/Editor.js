// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import styled from 'styled-components/macro';

import EditorItemMenu, { ItemMenuProvider } from './EditorItemMenu';
import EditorDesign from './EditorDesign';
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
  BlocksProvider,
  deviceSelector,
  useBlocksDispatch,
  useBlocksSelector,
} from './blocks';
import { ClipboardProvider } from './clipboard';

import { Box, Paper } from '@seine/styles/mui-core.macro';
import type { Block, BlockType } from '@seine/core';
import { DESELECT_ALL_BLOCKS } from '@seine/core';
import { ThemeProvider } from '@seine/styles';
import { Content } from '@seine/content';

const Contents = styled(Box).attrs({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})`
  overflow: auto;
`;

const EditorPaper = styled(Paper).attrs(() => ({
  component: Box,
  height: 600,
  m: 10,
  p: 2,
}))`
  overflow: auto;
  overflow-x: hidden;
  ${({ device, theme }) => ({
    width: device === 'mobile' ? theme.breakpoints.width('sm') : '100%',
  })}
`;

const defaultEditorChildren = [];

type Props = {
  parent: Block,
  onChange: (Block[]) => any,
  blockRenderMap?: (BlockType) => React.Node,
};

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
function DefaultEditor({
  parent,
  onChange,
  blockRenderMap = defaultBlockRenderMap,
  ...contentProps
}: Props) {
  const ParentBlock = blockRenderMap[parent.type];

  const dispatch = useBlocksDispatch();
  const blocks = useBlocksSelector(allBlocksSelector);
  const device = useBlocksSelector(deviceSelector);

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
    <ThemeProvider theme={defaultTheme}>
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
          <Sidebar>
            <SidebarSection>
              <SidebarHeading>Structure</SidebarHeading>
              <SidebarGroup>
                <EditorTree />
              </SidebarGroup>
            </SidebarSection>
          </Sidebar>

          <EditorPaper device={device}>
            <ParentBlock>
              <Content
                device={device}
                blockRenderMap={blockRenderMap}
                parent={parent}
                {...contentProps}
              >
                {blocks}
              </Content>
            </ParentBlock>
          </EditorPaper>

          <Sidebar
            onClick={useAutoCallback((event) => {
              event.stopPropagation();
            })}
          >
            <EditorDesign />
          </Sidebar>
        </Contents>
      </Box>
    </ThemeProvider>
  );
}

// eslint-disable-next-line
export default function Editor({ children = defaultEditorChildren, ...props }) {
  return (
    <BlocksProvider blocks={children}>
      <ClipboardProvider>
        <ItemMenuProvider>
          <DefaultEditor {...props} />
        </ItemMenuProvider>
      </ClipboardProvider>
    </BlocksProvider>
  );
}

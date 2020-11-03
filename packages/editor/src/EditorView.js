// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import defaultBlockRenderMap from './blockRenderMap';
import EditorDesign from './EditorDesign';
import {
  allBlocksSelector,
  deviceSelector,
  useBlocksDispatch,
  useEditorSelector,
} from './blocks';
import useBlocksChange from './useBlocksChange';
import {
  DeleteConfirmationDialog,
  Sidebar,
  SidebarGroup,
  SidebarHeading,
  SidebarSection,
} from './ui';
import EditorItemMenu from './EditorItemMenu';
import EditorToolbar from './EditorToolbar';
import EditorTree from './EditorTree';

import { Box } from '@seine/styles';
import { DESELECT_ALL_BLOCKS } from '@seine/core';
import { Content } from '@seine/content';
import { Paper } from '@seine/styles/mui-core.macro';
import type { Block, BlockType } from '@seine/core';

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
  blockRenderMap?: { [BlockType]: React.ComponentType },
  designAs?: React.ComponentType,
  toolbarAs?: React.ComponentType,
  treeAs?: React.ComponentType,
};

export type { Props as EditorViewProps };

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditorView({
  onChange,
  blockRenderMap = defaultBlockRenderMap,
  designAs: Design = EditorDesign,
  toolbarAs: Toolbar = EditorToolbar,
  treeAs: Tree = EditorTree,
}: Props) {
  const dispatch = useBlocksDispatch();
  const blocks = useEditorSelector(allBlocksSelector);
  const device = useEditorSelector(deviceSelector);

  useBlocksChange(onChange);

  return (
    <>
      <DeleteConfirmationDialog />
      <EditorItemMenu />
      <Toolbar />

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
                <Tree />
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
                  element &&
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
            <Design />
          </Sidebar>
        </Contents>
      </Box>
    </>
  );
}

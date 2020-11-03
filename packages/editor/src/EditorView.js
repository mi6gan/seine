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

import { Box } from '@seine/styles/mui-core.macro';
import { DESELECT_ALL_BLOCKS } from '@seine/core';
import { Content } from '@seine/content';
import type { Block, BlockType } from '@seine/core';

const Contents = styled(Box).attrs({
  width: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
})`
  overflow: auto;
`;

const EditorLayout = styled(Box).attrs({
  minHeight: 600,
  alignSelf: 'center',
  display: 'flex',
  p: 4,
})`
  overflow: auto;
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
 * @description Default content editor view.
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
        minHeight={'100%'}
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

          <EditorLayout
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
          </EditorLayout>

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

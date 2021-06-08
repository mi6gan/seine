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
import EditorMainMenu from './EditorMainMenu';
import EditorToolbar from './EditorToolbar';
import EditorTree from './EditorTree';
import EditorContent from './EditorContent';

import { Box } from '@seine/styles/mui-core.macro';
import type { Block, BlockType } from '@seine/core';
import { DESELECT_ALL_BLOCKS } from '@seine/core';

const Contents = styled(Box).attrs({
  width: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
})`
  overflow: auto;
`;

type Props = {
  /** Function to be called on each edit or selection. */
  onChange: (Block[]) => any,
  /** Block components map. */
  blockRenderMap?: { [BlockType]: React.ComponentType },
  /** Design panel component. */
  designAs?: React.ComponentType,
  /** Toolbar component. */
  toolbarAs?: React.ComponentType,
  /** Custom structure tree panel component. */
  treeAs?: React.ComponentType,
  /** Main menu component. */
  mainMenuAs?: React.ComponentType,
  /** Block context menu component. */
  itemMenuAs?: React.ComponentType,
};

export type { Props as EditorViewProps };

/**
 * @description Default layout view.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditorView({
  onChange,
  blockRenderMap = defaultBlockRenderMap,
  designAs: Design = EditorDesign,
  toolbarAs: Toolbar = EditorToolbar,
  treeAs: Tree = EditorTree,
  mainMenuAs: MainMenu = EditorMainMenu,
  itemMenuAs: ItemMenu = EditorItemMenu,
}: Props) {
  const dispatch = useBlocksDispatch();
  const blocks = useEditorSelector(allBlocksSelector);
  const device = useEditorSelector(deviceSelector);
  const stopPropagation = useAutoCallback((event) => {
    event.stopPropagation();
  });

  useBlocksChange(onChange);

  return (
    <>
      <DeleteConfirmationDialog />
      <ItemMenu />
      <MainMenu />
      {Toolbar && <Toolbar />}

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
          {Tree && (
            <Sidebar open anchor={'left'}>
              <SidebarSection>
                <SidebarHeading>Structure</SidebarHeading>
                <SidebarGroup>
                  <Tree />
                </SidebarGroup>
              </SidebarSection>
            </Sidebar>
          )}

          <EditorContent
            device={device}
            ref={useAutoCallback((element) => {
              element &&
                element.scrollIntoView({
                  block: 'center',
                  inline: 'center',
                });
            })}
            blockRenderMap={blockRenderMap}
          >
            {blocks}
          </EditorContent>

          {Design && (
            <Sidebar open anchor={'right'} onClick={stopPropagation}>
              <Design />
            </Sidebar>
          )}
        </Contents>
      </Box>
    </>
  );
}

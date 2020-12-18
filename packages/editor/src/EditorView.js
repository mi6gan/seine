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
  /**
   * Function to be called on each edit or selection.
   */
  onChange: (Block[]) => any,
  /**
   * Block components map.
   *
   * @default {@link defaultBlockRenderMap}
   */
  blockRenderMap?: { [BlockType]: React.ComponentType },
  /**
   * Design panel component.
   *
   * @default {@link EditorDesign}
   */
  designAs?: React.ComponentType,
  /**
   * Toolbar component.
   *
   * @default {@link EditorToolbar}
   */
  toolbarAs?: React.ComponentType,
  /**
   * Custom structure tree panel component.
   *
   * @default {@link EditorTree}
   */
  treeAs?: React.ComponentType,
  /**
   * Block context menu component.
   *
   * @default {@link EditorItemMenu}
   */
  itemMenuAs?: React.ComponentType,
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
  itemMenuAs: ItemMenu = EditorItemMenu,
}: Props) {
  const dispatch = useBlocksDispatch();
  const blocks = useEditorSelector(allBlocksSelector);
  const device = useEditorSelector(deviceSelector);

  useBlocksChange(onChange);

  return (
    <>
      <DeleteConfirmationDialog />
      <ItemMenu />
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

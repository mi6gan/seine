// @flow
import * as React from 'react';
import { Box, ButtonBase, MenuItem, Paper, Select } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import styled from 'styled-components/macro';

import defaultTheme from './defaultTheme';
import Sidebar from './ui/Sidebar';
import Toolbar from './ui/Toolbar';
import ToolbarButton from './ui/ToolbarButton';
import ToolbarMenu from './ui/ToolbarMenu';
import ToolbarSeparator from './ui/ToolbarSeparator';
import RichTextIconButton from './richtext/RichTextIconButton';
import TableIconButton from './table/TableIconButton';
import BarChartIconButton from './chart/BarChartIconButton';
import LineChartIconButton from './chart/LineChartIconButton';
import ColumnChartIconButton from './chart/ColumnChartIconButton';
import PieChartIconButton from './chart/PieChartIconButton';
import defaultBlockRenderMap from './blockRenderMap';
import RichTextDesign from './richtext/RichTextDesign';
import TableDesign from './table/TableDesign';
import LayoutDesign from './layout/LayoutDesign';
import {
  useBlocksDispatch,
  useBlocksSelector,
  EditorProvider,
} from './context';
import useSelectedLayoutItems from './layout/useSelectedLayoutItems';
import { ChartDesign } from './chart';
import CreateLayoutButton from './ui/CreateLayoutButton';
import DeleteBlockButton from './ui/DeleteBlockButton';
import ItemDesign from './layout/ItemDesign';

import { Content } from '@seine/content';
import type { Block, BlockType } from '@seine/core';
import { blockTypes, DESELECT_ALL_BLOCKS, SET_DEVICE } from '@seine/core';
import { ThemeProvider } from '@seine/styles';

const Contents = styled(Box).attrs({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})`
  overflow: auto;
`;

const MenuButton = styled(Box).attrs(({ disabled }) => ({
  component: ButtonBase,
  color: disabled ? 'grey.500' : 'inherit',
}))``;

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

const StyledSelect = styled(Select)`
  && {
    color: ${({ theme }) => theme.palette.grey[50]}};
  }
`;

const defaultEditorChildren = [];

const blocksSelector = (state) => state.blocks;
const selectionSelector = (state) => state.selection;
const deviceSelector = (state) => state.device;

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

  const menuAnchorRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = useAutoCallback(() => setMenuOpen(false));

  const dispatch = useBlocksDispatch();
  const blocks = useBlocksSelector(blocksSelector);
  const selection = useBlocksSelector(selectionSelector);
  const device = useBlocksSelector(deviceSelector);
  const { layout, item } = useSelectedLayoutItems();

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
      <ToolbarMenu
        onClose={closeMenu}
        open={menuOpen}
        anchorEl={menuAnchorRef.current}
        keepMounted
        mt={3}
        ml={-1}
      >
        <MenuItem onClick={closeMenu}>
          <CreateLayoutButton as={MenuButton}>Create layout</CreateLayoutButton>
        </MenuItem>

        <MenuItem>
          <MenuButton disabled={!selection || !selection.length}>
            Copy
          </MenuButton>
        </MenuItem>

        <MenuItem onClick={closeMenu}>
          <DeleteBlockButton as={MenuButton}>Delete</DeleteBlockButton>
        </MenuItem>
      </ToolbarMenu>

      <Toolbar ref={menuAnchorRef}>
        <Box width={'40%'}>
          <ToolbarButton
            onClick={useAutoCallback(() => {
              setMenuOpen(true);
            })}
            selected={menuOpen}
          >
            <MenuIcon />
          </ToolbarButton>
          <ToolbarSeparator />

          <RichTextIconButton />
          <ToolbarSeparator />

          <TableIconButton />
          <ToolbarSeparator />

          <BarChartIconButton />
          <LineChartIconButton />
          <ColumnChartIconButton />
          <PieChartIconButton />
        </Box>
        <Box width={'20%'} textAlign={'center'}>
          <StyledSelect
            value={device}
            onChange={(event) =>
              dispatch({ type: SET_DEVICE, device: event.target.value })
            }
          >
            <MenuItem value={'any'}>Any device</MenuItem>
            <MenuItem value={'mobile'}>Mobile only</MenuItem>
          </StyledSelect>
        </Box>
        <Box width={'40%'} />
      </Toolbar>

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
            {item && <ItemDesign />}
            {layout && <LayoutDesign />}
            {item && item.type === blockTypes.RICH_TEXT && <RichTextDesign />}
            {item && item.type === blockTypes.TABLE && <TableDesign />}
            {item && item.type === blockTypes.CHART && <ChartDesign />}
          </Sidebar>
        </Contents>
      </Box>
    </ThemeProvider>
  );
}

// eslint-disable-next-line
export default function Editor({ children = defaultEditorChildren, ...props }) {
  return (
    <EditorProvider blocks={children}>
      <DefaultEditor {...props} />
    </EditorProvider>
  );
}

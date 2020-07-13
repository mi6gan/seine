// @flow
import * as React from 'react';
import { Box, ButtonBase, MenuItem, Paper } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { ThemeProvider } from '@seine/styles';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import styled from 'styled-components/macro';
import { blockTypes, DESELECT_ALL_BLOCKS } from '@seine/core';
import { Content } from '@seine/content';

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
import { useEditorDispatch, useEditorSelector } from './store';
import EditorProvider from './store/EditorProvider';
import useSelectedLayoutItems from './store/useSelectedLayoutItems';

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
  width: '100%',
  m: 10,
  p: 2,
}))`
  overflow: auto;
  overflow-x: hidden;
`;

const defaultEditorChildren = [];

/**
 * @description Default content editor.
 * @returns {React.Node}
 */
function DefaultEditor({
  parent,
  onChange,
  blockRenderMap = defaultBlockRenderMap,
  ...contentProps
}) {
  const menuAnchorRef = React.useRef(null);

  const toolCursorRef = React.useRef(null);

  const dispatch = useEditorDispatch();
  const { blocks, selection } = useEditorSelector();

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

  const deselectClickHandler = useAutoCallback(() => {
    dispatch({ type: DESELECT_ALL_BLOCKS });
  });
  const { layout, item } = useSelectedLayoutItems();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToolbarMenu
        onClose={useAutoCallback(() => setMenuOpen(false))}
        open={menuOpen}
        anchorEl={menuAnchorRef.current}
        keepMounted
        mt={3}
        ml={-1}
      >
        <MenuItem>
          <MenuButton disabled={!selection || !selection.length}>
            Copy
          </MenuButton>
        </MenuItem>

        <MenuItem>
          <MenuButton disabled={!selection || !selection.length}>
            Delete
          </MenuButton>
        </MenuItem>
      </ToolbarMenu>

      <Toolbar onClick={deselectClickHandler} ref={menuAnchorRef}>
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
      </Toolbar>

      <Box
        onClick={deselectClickHandler}
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        bgcolor={'grey.300'}
        position={'relative'}
        height={'100%'}
      >
        <Contents cursor={toolCursorRef.current}>
          <EditorPaper>
            <Content
              blockRenderMap={blockRenderMap}
              parent={parent}
              {...contentProps}
            >
              {blocks}
            </Content>
          </EditorPaper>

          <Sidebar
            onClick={useAutoCallback((event) => {
              event.stopPropagation();
            })}
          >
            {layout && <LayoutDesign />}
            {item && item.type === blockTypes.RICH_TEXT && <RichTextDesign />}
            {item && item.type === blockTypes.TABLE && <TableDesign />}
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

// @flow
import * as React from 'react';
import { Box, ButtonBase, MenuItem, Paper } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { ThemeProvider } from '@seine/styles';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';
import type { BlocksAction, BlocksState } from '@seine/core';
import {
  blockTypes,
  DESELECT_ALL_BLOCKS,
  initialBlocksState,
  reduceBlocks,
} from '@seine/core';
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

const Contents = styled(Box).attrs({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})`
  ${({ cursor }) => cursor && { cursor }};
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
export default function Editor({
  parent,
  onChange,
  children = defaultEditorChildren,
  blockRenderMap = defaultBlockRenderMap,
  ...contentProps
}) {
  const parentId = parent && parent.id;

  const menuAnchorRef = React.useRef(null);

  const [action, setAction] = React.useState(null);
  const toolCursorRef = React.useRef(null);
  const unsetAction = useAutoCallback(() => {
    toolCursorRef.current = null;
    setAction(null);
  });
  const selectBlockAction = useAutoCallback((value, event) => {
    const svg = event.currentTarget.querySelector('svg');
    const content = svg && btoa(svg.outerHTML);

    toolCursorRef.current =
      content && `url(data:image/svg+xml;base64,${content}), auto`;
    setAction(value);
  });

  const [{ blocks, selection }, dispatch] = React.useReducer<
    BlocksState,
    BlocksAction
  >(
    reduceBlocks,
    initialBlocksState,
    useAutoCallback(() => ({
      ...initialBlocksState,
      blocks: children,
    }))
  );

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

  const contentChildren = useAutoMemo(
    blocks.map((block) => ({
      ...block,
      dispatch,
      selection,
    }))
  );

  const { type, ...block } = useAutoMemo(
    selection.length === 1
      ? blocks.find(({ id }) => selection.includes(id))
      : parent
  );

  const deselectClickHandler = useAutoCallback(() => {
    if (action) {
      unsetAction();
      dispatch(action);
    } else {
      dispatch({ type: DESELECT_ALL_BLOCKS });
    }
  });

  const layoutSelection = blocks.find(
    ({ id, type }) =>
      selection.includes(id) &&
      (type === blockTypes.FLEX || type === blockTypes.GRID)
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToolbarMenu
        onClose={unsetAction}
        open={action === 'menu'}
        anchorEl={menuAnchorRef.current}
        keepMounted
        mt={3}
        ml={-1}
      >
        <MenuItem>
          <MenuButton
            onClick={unsetAction}
            disabled={!selection || !selection.length}
          >
            Copy
          </MenuButton>
        </MenuItem>

        <MenuItem>
          <MenuButton
            onClick={unsetAction}
            disabled={!selection || !selection.length}
          >
            Delete
          </MenuButton>
        </MenuItem>
      </ToolbarMenu>

      <Toolbar
        onClick={deselectClickHandler}
        onKeyUp={useAutoCallback((event) => {
          if (event.key === 'Escape') {
            unsetAction();
          }
        })}
        ref={menuAnchorRef}
      >
        <ToolbarButton
          onClick={useAutoCallback(() => {
            setAction('menu');
          })}
          selected={action === 'menu'}
        >
          <MenuIcon />
        </ToolbarButton>

        <ToolbarSeparator />

        <RichTextIconButton
          {...action}
          parentId={parentId}
          dispatch={selectBlockAction}
        />

        <ToolbarSeparator />

        <TableIconButton
          {...action}
          parentId={parentId}
          dispatch={selectBlockAction}
        />

        <ToolbarSeparator />

        <BarChartIconButton
          {...action}
          parentId={parentId}
          dispatch={selectBlockAction}
        />
        <LineChartIconButton
          {...action}
          parentId={parentId}
          dispatch={selectBlockAction}
        />
        <ColumnChartIconButton
          {...action}
          parentId={parentId}
          dispatch={selectBlockAction}
        />
        <PieChartIconButton
          {...action}
          parentId={parentId}
          dispatch={selectBlockAction}
        />
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
              {contentChildren}
            </Content>
          </EditorPaper>

          <Sidebar
            onClick={useAutoCallback((event) => {
              event.stopPropagation();
            })}
          >
            {!!layoutSelection && (
              <LayoutDesign
                {...layoutSelection}
                dispatch={dispatch}
                selection={selection}
              />
            )}
            {type === blockTypes.RICH_TEXT ? (
              <RichTextDesign
                {...block}
                dispatch={dispatch}
                selection={selection}
              />
            ) : type === blockTypes.TABLE ? (
              <TableDesign
                {...block}
                dispatch={dispatch}
                selection={selection}
              />
            ) : null}
          </Sidebar>
        </Contents>
      </Box>
    </ThemeProvider>
  );
}

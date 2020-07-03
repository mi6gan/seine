// @flow
import * as React from 'react';
import { Box, ButtonBase, MenuItem, Paper } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { ResizeObserverProvider, ThemeProvider } from '@seine/styles';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import styled from 'styled-components/macro';
import type { BlocksAction, BlocksState } from '@seine/core';
import { initialBlocksState, reduceBlocks } from '@seine/core';
import { useReducerEx } from '@seine/ui';
import { Content } from '@seine/contents';

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

const StyledContent = styled(Paper).attrs(() => ({
  component: Content,
  forwardedAs: Box,
  height: 600,
  width: '100%',
  m: 10,
  p: 2,
}))`
  overflow: auto;
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

  const [{ blocks, selection }, dispatch] = useReducerEx<
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <ResizeObserverProvider>
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
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          bgcolor={'grey.300'}
          position={'relative'}
          height={'100%'}
        >
          <Contents
            cursor={toolCursorRef.current}
            onClick={useAutoCallback(() => {
              if (action) {
                unsetAction();
                dispatch(action);
              }
            })}
          >
            <StyledContent {...contentProps} parent={parent}>
              {blocks}
            </StyledContent>
            <Sidebar>&nbsp;</Sidebar>
          </Contents>
        </Box>
      </ResizeObserverProvider>
    </ThemeProvider>
  );
}

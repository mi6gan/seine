// @flow
import * as React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  ButtonBase,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  FontDownloadSharp as RichTextIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import { ResizeObserverProvider, ThemeProvider } from '@seine/styles';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';
import type { BlocksAction, BlocksState } from '@seine/core';
import {
  blockTypes,
  chartTypes,
  CREATE_BLOCK,
  createBlock,
  createTitleIdentityBlockElements,
  initialBlocksState,
  reduceBlocks,
} from '@seine/core';
import { ActionButton, useReducerEx } from '@seine/ui';
import { toRawContent } from '@seine/draft';
import { Content } from '@seine/content';

import defaultTheme from './defaultTheme';

const ToolbarButton = styled(Button).attrs(() => ({
  color: 'inherit',
}))`
  && {
    ${({ selected, theme }) =>
      selected && { backgroundColor: theme.palette.grey[800] }};
    border-radius: 0;
    min-width: 0;
  }
`;

const Toolbar = styled(Box).attrs({
  bgcolor: 'grey.700',
  color: 'grey.50',
  width: '100%',
})``;

const StyledMenu = styled(Box).attrs({ component: Menu })`
  .MuiMenu-paper {
    color: ${({ theme }) => theme.palette.grey[50]};
    background-color: ${({ theme }) => theme.palette.grey[700]};
    min-width: 10em;
  }
`;

const Contents = styled(Box).attrs({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})`
  ${({ cursor }) => cursor && { cursor }};
  overflow: auto;
`;

const Sidebar = styled(Box).attrs({
  bgcolor: 'grey.100',
  color: 'grey.700',
  height: 760,
  minWidth: 320,
})``;

// eslint-disable-next-line
function ActionIconButton({ Icon, ...action }) {
  return (
    <ToolbarButton
      as={ActionButton}
      title={
        action.type === CREATE_BLOCK
          ? `Add ${
              action.block.type === blockTypes.CHART
                ? `${action.block.format.kind} chart`
                : action.block.type === blockTypes.RICH_TEXT
                ? 'rich text'
                : action.block.type
            }`
          : action.type
      }
      {...action}
    >
      <Icon
        fill={'currentColor'}
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
      />
    </ToolbarButton>
  );
}

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
        <StyledMenu
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
        </StyledMenu>

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

          <ActionIconButton
            selected={
              action &&
              action.type === CREATE_BLOCK &&
              action.block &&
              action.block.type === blockTypes.RICH_TEXT
            }
            type={CREATE_BLOCK}
            block={useAutoMemo(
              action !== void 0 &&
                createBlock(
                  blockTypes.RICH_TEXT,
                  toRawContent('Rich text'),
                  {
                    verticalAlignment: 'center',
                  },
                  parentId
                )
            )}
            Icon={RichTextIcon}
            dispatch={selectBlockAction}
          />

          <ActionIconButton
            selected={
              action &&
              action.type === CREATE_BLOCK &&
              action.block &&
              action.block.type === blockTypes.CHART &&
              action.block.format &&
              action.block.format.kind === chartTypes.BAR
            }
            type={CREATE_BLOCK}
            block={useAutoMemo(
              action !== void 0 &&
                createBlock(
                  blockTypes.CHART,
                  {
                    elements: createTitleIdentityBlockElements([
                      {
                        title: 'First item',
                        value: 30,
                      },
                      {
                        title: 'Second item',
                        value: 70,
                      },
                    ]),
                  },
                  {
                    verticalAlignment: 'center',
                    kind: chartTypes.BAR,
                  },
                  parentId
                )
            )}
            Icon={BarChartIcon}
            dispatch={selectBlockAction}
          />

          <ActionIconButton
            selected={
              action &&
              action.type === CREATE_BLOCK &&
              action.block &&
              action.block.type === blockTypes.CHART &&
              action.block.format &&
              action.block.format.kind === chartTypes.PIE
            }
            type={CREATE_BLOCK}
            block={useAutoMemo(
              action !== void 0 &&
                createBlock(
                  blockTypes.CHART,
                  {
                    elements: [
                      {
                        title: 'First slice',
                        value: 30,
                      },
                      {
                        title: 'Second slice',
                        value: 70,
                      },
                    ],
                  },
                  {
                    verticalAlignment: 'center',
                    kind: chartTypes.PIE,
                  },
                  parentId
                )
            )}
            Icon={PieChartIcon}
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

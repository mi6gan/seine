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
  FontDownloadSharp as RichTextIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import { ThemeProvider } from '@seine/styles';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
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
import { useReducerEx } from '@seine/ui';
import { toRawContent } from '@seine/draft';
import { Content } from '@seine/content';
import { defaultBarChartFormat } from '@seine/charts';

import defaultTheme from './defaultTheme';

const ToolbarButton = styled(Button).attrs(() => ({
  color: 'inherit',
}))`
  && {
    ${({ selected, theme }) =>
      selected && { backgroundColor: theme.palette.grey[800] }};
  }
`;

const Toolbar = styled(Box).attrs({
  bgcolor: 'grey.700',
  color: 'grey.50',
  width: '100%',
})`
  ${ToolbarButton} {
    border-radius: 0;
    min-width: 0;
  }
`;

const StyledMenu = styled(Box).attrs({ component: Menu })`
  .MuiMenu-paper {
    color: ${({ theme }) => theme.palette.grey[50]};
    background-color: ${({ theme }) => theme.palette.grey[700]};
    min-width: 10em;
  }
`;

const Contents = styled(Box).attrs({
  minHeight: 480,
  width: '80%',
})`
  ${({ cursor }) => cursor && { cursor }};
`;

const Sidebar = styled(Box).attrs({
  bgcolor: 'grey.100',
  color: 'grey.700',
  width: '20%',
  height: '100%',
  minHeight: 320,
})``;

// eslint-disable-next-line
function BlockToolbarButton({
  type,
  Icon,
  tool,
  iconRef,
  setTool,
  ...buttonProps
}) {
  const label =
    type === blockTypes.RICH_TEXT ? 'rich text' : type.toLowerCase();

  return (
    <ToolbarButton
      selected={tool === type}
      aria-label={type}
      value={type}
      title={`Add ${label}`}
      {...buttonProps}
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
  const [tool, setTool] = React.useState(null);

  const menuAnchorRef = React.useRef(null);
  const toolCursorRef = React.useRef(null);

  const unsetTool = useAutoCallback(() => {
    toolCursorRef.current = null;
    setTool(null);
  });

  const setBlockTool = useAutoCallback((event) => {
    const svg = event.currentTarget.querySelector('svg');
    const content = svg && btoa(svg.outerHTML);

    toolCursorRef.current =
      content && `url(data:image/svg+xml;base64,${content}), auto`;
    setTool(event.currentTarget.value);
  });

  const init = useAutoCallback(() => ({
    ...initialBlocksState,
    blocks: children,
  }));
  const [{ blocks, selection }, dispatch] = useReducerEx<
    BlocksState,
    BlocksAction
  >(reduceBlocks, initialBlocksState, init);

  useAutoEffect(() => {
    onChange(
      // no extra data should be passed, like `editor` key value
      blocks.map(({ id, body, format, parent_id, type }) => ({
        body,
        format,
        id,
        parent_id,
        type,
      }))
    );
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledMenu
        open={tool === 'menu'}
        onClose={unsetTool}
        anchorEl={menuAnchorRef.current}
        keepMounted
        mt={6}
      >
        <MenuItem>
          <MenuButton
            onClick={unsetTool}
            disabled={!selection || !selection.length}
          >
            Copy
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            onClick={unsetTool}
            disabled={!selection || !selection.length}
          >
            Delete
          </MenuButton>
        </MenuItem>
      </StyledMenu>

      <Toolbar>
        <ToolbarButton
          aria-label={'menu'}
          onClick={useAutoCallback(() => setTool('menu'))}
          selected={tool === 'menu'}
          ref={menuAnchorRef}
        >
          <MenuIcon />
        </ToolbarButton>

        <BlockToolbarButton
          tool={tool}
          type={blockTypes.RICH_TEXT}
          Icon={RichTextIcon}
          onClick={setBlockTool}
        />

        <BlockToolbarButton
          tool={tool}
          type={`${chartTypes.BAR} ${blockTypes.CHART}`}
          Icon={BarChartIcon}
          onClick={setBlockTool}
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
            unsetTool();
            const [chartType, blockType = chartType] = tool.split(' ');

            switch (blockType) {
              case blockTypes.RICH_TEXT:
                dispatch({
                  type: CREATE_BLOCK,
                  block: createBlock(
                    blockTypes.RICH_TEXT,
                    toRawContent('Rich text'),
                    {
                      verticalAlignment: 'center',
                    },
                    parent && parent.id
                  ),
                });
                break;

              case blockTypes.CHART:
                switch (chartType) {
                  case chartTypes.BAR:
                    dispatch({
                      type: CREATE_BLOCK,
                      block: createBlock(
                        blockTypes.CHART,
                        {
                          elements: createTitleIdentityBlockElements([
                            {
                              title: 'First line',
                              value: 35,
                            },
                            {
                              title: 'Second line',
                              value: 70,
                            },
                          ]),
                        },
                        defaultBarChartFormat,
                        parent && parent.id
                      ),
                    });
                    break;

                  default:
                    return;
                }
                break;

              default:
                return;
            }
          })}
        >
          <Content
            {...contentProps}
            as={Paper}
            component={Box}
            minHeight={320}
            m={10}
            p={2}
            parent={parent}
          >
            {blocks}
          </Content>
        </Contents>
        <Sidebar>&nbsp;</Sidebar>
      </Box>
    </ThemeProvider>
  );
}

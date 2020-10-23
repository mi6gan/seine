// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarInput,
  SidebarLabel,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop,
} from '@seine/styles/mui-icons.macro';
import { Box } from '@seine/styles';
import { defaultGridFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useSelectedLayoutItems } from '@seine/editor';

const MAX_GAP = 19;

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function GridDesign() {
  const device = useEditorSelector((state) => state.device);
  const { layout: layoutBlock } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const id = layoutBlock && layoutBlock.id;
  const {
    columnGap = defaultGridFormat.columnGap,
    rowGap = defaultGridFormat.rowGap,
    justify = defaultGridFormat.justify,
    alignItems = defaultGridFormat.alignItems,
  } =
    layoutBlock && layoutBlock.format
      ? layoutBlock.format[device] || layoutBlock.format || defaultGridFormat
      : defaultGridFormat;

  return (
    <>
      <SidebarGroup>
        <SidebarLabel>Spacing</SidebarLabel>

        <Box display={'flex'} width={1}>
          <Box width={1 / 2}>
            <SidebarLabel mr={1}>x:</SidebarLabel>
            <SidebarInput
              value={Math.min(columnGap, MAX_GAP)}
              onChange={useAutoCallback(({ currentTarget }) => {
                dispatch({
                  type: UPDATE_BLOCK_FORMAT,
                  id,
                  format: { columnGap: +currentTarget.value },
                });
              })}
              type={'number'}
              inputProps={{ min: 0, max: MAX_GAP }}
            />
          </Box>

          <Box width={1 / 2}>
            <SidebarLabel mr={1}>y:</SidebarLabel>
            <SidebarInput
              value={Math.min(rowGap, MAX_GAP)}
              onChange={useAutoCallback(({ currentTarget }) => {
                dispatch({
                  type: UPDATE_BLOCK_FORMAT,
                  id,
                  format: { rowGap: +currentTarget.value },
                });
              })}
              type={'number'}
              inputProps={{ min: 0, max: MAX_GAP }}
            />
          </Box>
        </Box>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Justify</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={justify}
          onChange={useAutoCallback((event, justify) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { justify },
            })
          )}
        >
          <ToolbarToggleButton value={'start'}>
            <FormatAlignLeft />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <FormatAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'end'}>
            <FormatAlignRight />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'space-between'}>
            <FormatAlignJustify />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Align</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={alignItems}
          onChange={useAutoCallback((event, alignItems) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { alignItems },
            })
          )}
        >
          <ToolbarToggleButton value={'start'}>
            <VerticalAlignTop />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <VerticalAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'end'}>
            <VerticalAlignBottom />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>
    </>
  );
}

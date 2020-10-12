// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarInput,
  SidebarLabel,
  SidebarSelectLabel,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { useBlocksDispatch, useBlocksSelector } from '../contexts';

import { MenuItem, Select } from '@seine/styles/mui-core.macro';
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop,
  WrapText,
} from '@seine/styles/mui-icons.macro';
import {
  blockTypes,
  defaultFlexFormat,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function FlexDesign() {
  const device = useBlocksSelector((state) => state.device);
  const layoutBlock = useBlocksSelector().find(
    ({ type }) => type === blockTypes.LAYOUT
  );
  const dispatch = useBlocksDispatch();
  const id = layoutBlock && layoutBlock.id;
  const {
    spacing = defaultFlexFormat.spacing,
    justify = defaultFlexFormat.justify,
    alignItems = defaultFlexFormat.alignItems,
    direction = defaultFlexFormat.direction,
    wrap = defaultFlexFormat.wrap,
  } = layoutBlock
    ? layoutBlock.format[device] || layoutBlock.format || defaultFlexFormat
    : defaultFlexFormat;
  const iconProps = direction === 'column' && {
    style: { transform: 'rotate(-90deg)' },
  };
  return (
    <>
      <SidebarGroup>
        <SidebarLabel>Spacing</SidebarLabel>
        <SidebarInput
          value={spacing}
          onChange={useAutoCallback(({ currentTarget }) => {
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { spacing: +currentTarget.value },
            });
          })}
          type={'number'}
          inputProps={{ min: 0, max: 10 }}
        />
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Direction</SidebarLabel>
        <Select
          value={direction}
          onChange={useAutoCallback((event) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: {
                direction: event.target.value,
              },
            })
          )}
        >
          <MenuItem value={'row'}>
            <SidebarSelectLabel>Row</SidebarSelectLabel>
          </MenuItem>
          <MenuItem value={'column'}>
            <SidebarSelectLabel>Column</SidebarSelectLabel>
          </MenuItem>
        </Select>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Justify</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={justify}
          onChange={useAutoCallback((event, justify) =>
            dispatch({ type: UPDATE_BLOCK_FORMAT, format: { justify } })
          )}
        >
          <ToolbarToggleButton value={'flex-start'}>
            <FormatAlignLeft {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <FormatAlignCenter {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'flex-end'}>
            <FormatAlignRight {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'space-between'}>
            <FormatAlignJustify {...iconProps} />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Align</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={alignItems}
          onChange={useAutoCallback((event, alignItems) =>
            dispatch({ type: UPDATE_BLOCK_FORMAT, format: { alignItems } })
          )}
        >
          <ToolbarToggleButton value={'flex-start'}>
            <VerticalAlignTop {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <VerticalAlignCenter {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'flex-end'}>
            <VerticalAlignBottom {...iconProps} />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel shrink>Wrap</SidebarLabel>
        <ToolbarToggleButton
          selected={wrap === 'wrap'}
          onClick={useAutoCallback(() =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: { wrap: wrap === 'wrap' ? 'nowrap' : 'wrap' },
            })
          )}
        >
          <WrapText />
        </ToolbarToggleButton>
      </SidebarGroup>
    </>
  );
}

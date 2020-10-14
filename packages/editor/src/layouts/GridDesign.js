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
import { useBlocksDispatch, useBlocksSelector } from '../blocks';

import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop,
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
        <SidebarLabel>Justify</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={justify}
          onChange={useAutoCallback((event, justify) =>
            dispatch({ type: UPDATE_BLOCK_FORMAT, format: { justify } })
          )}
        >
          <ToolbarToggleButton value={'start'}>
            <FormatAlignLeft {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <FormatAlignCenter {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'end'}>
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
          <ToolbarToggleButton value={'start'}>
            <VerticalAlignTop {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <VerticalAlignCenter {...iconProps} />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'end'}>
            <VerticalAlignBottom {...iconProps} />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>
    </>
  );
}

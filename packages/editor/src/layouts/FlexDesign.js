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
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';

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
import { defaultFlexFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';

const MAX_SPACING = 19;

type Props = {
  inputAs?: React.ComponentType,
};

/**
 * @description Flex design.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function FlexDesign({
  inputAs: Input = SidebarInput,
  toggleAs: ToggleButtonGroup = ToolbarToggleButtonGroup,
}: Props) {
  const device = useEditorSelector((state) => state.device);
  const { layout: layoutBlock } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const id = layoutBlock && layoutBlock.id;
  const {
    spacing = defaultFlexFormat.spacing,
    justify = defaultFlexFormat.justify,
    alignItems = defaultFlexFormat.alignItems,
    direction = defaultFlexFormat.direction,
    wrap = defaultFlexFormat.wrap,
  } =
    layoutBlock && layoutBlock.format
      ? layoutBlock.format[device] || layoutBlock.format || defaultFlexFormat
      : defaultFlexFormat;
  const iconProps = direction === 'column' && {
    style: { transform: 'rotate(-90deg)' },
  };
  return (
    <>
      <SidebarGroup>
        <SidebarLabel>Spacing</SidebarLabel>
        <Input
          value={spacing}
          onChange={useAutoCallback(({ currentTarget }) => {
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { spacing: +currentTarget.value },
            });
          })}
          type={'number'}
          inputProps={{ min: 0, max: MAX_SPACING }}
        />
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Direction</SidebarLabel>
        <Select
          value={direction}
          onChange={useAutoCallback((event) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
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
        <ToggleButtonGroup
          name={'justify'}
          value={justify}
          onChange={useAutoCallback((event, justify) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { justify },
            })
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
        </ToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>Align</SidebarLabel>
        <ToggleButtonGroup
          name={'alignItems'}
          value={alignItems}
          onChange={useAutoCallback((event, alignItems) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { alignItems },
            })
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
        </ToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel shrink>Wrap</SidebarLabel>
        <ToggleButtonGroup
          name={'wrap'}
          value={alignItems}
          onChange={useAutoCallback((event, wrap) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { wrap },
            })
          )}
        >
          <ToolbarToggleButton
            selected={wrap === 'wrap'}
            value={wrap === 'wrap' ? 'nowrap' : 'wrap'}
          >
            <WrapText />
          </ToolbarToggleButton>
        </ToggleButtonGroup>
      </SidebarGroup>
    </>
  );
}

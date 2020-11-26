// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarInput,
  SidebarLabel,
  SidebarSelect,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { useBlocksDispatch } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';

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
import type { FlexFormat } from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';

const MAX_SPACING = 19;

type Props = {
  defaults?: FlexFormat,
  inputAs?: React.ComponentType,
  toggleAs?: React.ComponentType,
};

/**
 * @description Flex design.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function FlexDesign({
  inputAs: Input = SidebarInput,
  selectAs: Select = SidebarSelect,
  toggleAs: ToggleButtonGroup = ToolbarToggleButtonGroup,
}: Props) {
  const {
    layout: {
      id,
      format: { spacing, justify, alignItems, direction, wrap },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const iconProps = direction === 'column' && {
    style: { transform: 'rotate(-90deg)' },
  };
  return (
    <>
      <SidebarGroup>
        <SidebarLabel>Spacing</SidebarLabel>
        <Input
          defaultValue={spacing}
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
          name={'direction'}
          native
          defaultValue={direction}
          onChange={useAutoCallback((event) => {
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: {
                direction: event.target.value,
              },
            });
          })}
        >
          <option value={'row'}>Row</option>
          <option value={'column'}>Column</option>
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

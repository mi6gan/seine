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
  selectAs?: React.ComponentType,
  inputAs?: React.ComponentType,
  toggleAs?: React.ComponentType,
  toggleButtonAs?: React.ComponentType,
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
  toggleButtonAs: ToggleButton = ToolbarToggleButton,
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
          name={'spacing'}
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
          <ToggleButton value={'flex-start'}>
            <FormatAlignLeft {...iconProps} />
          </ToggleButton>

          <ToggleButton value={'center'}>
            <FormatAlignCenter {...iconProps} />
          </ToggleButton>

          <ToggleButton value={'flex-end'}>
            <FormatAlignRight {...iconProps} />
          </ToggleButton>

          <ToggleButton value={'space-between'}>
            <FormatAlignJustify {...iconProps} />
          </ToggleButton>
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
          <ToggleButton value={'flex-start'}>
            <VerticalAlignTop {...iconProps} />
          </ToggleButton>

          <ToggleButton value={'center'}>
            <VerticalAlignCenter {...iconProps} />
          </ToggleButton>

          <ToggleButton value={'flex-end'}>
            <VerticalAlignBottom {...iconProps} />
          </ToggleButton>
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
          <ToggleButton
            selected={wrap === 'wrap'}
            value={wrap === 'wrap' ? 'nowrap' : 'wrap'}
          >
            <WrapText />
          </ToggleButton>
        </ToggleButtonGroup>
      </SidebarGroup>
    </>
  );
}

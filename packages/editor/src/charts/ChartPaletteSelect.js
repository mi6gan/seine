// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { SidebarSelectLabel, SidebarGroup, SidebarLabel } from '../ui';
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { MenuItem, Select } from '@seine/styles/mui-core.macro';
import { blockTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { chartPaletteKeyValues, defaultChartFormat } from '@seine/content';

/**
 * @description Buttons to select chart's default palette
 * @returns {*}
 */
export default function ChartPaletteSelect() {
  const device = useEditorSelector((state) => state.device);
  const dispatch = useBlocksDispatch();
  const block =
    useEditorSelector().find(({ type }) => type === blockTypes.CHART) || {};
  const { id } = block;
  const { paletteKey = defaultChartFormat.paletteKey } =
    (block && block.format && block.format[device]) ||
    block.format ||
    defaultChartFormat;
  return (
    <SidebarGroup>
      <SidebarLabel>palette</SidebarLabel>
      <Select
        value={paletteKey}
        onChange={useAutoCallback((event) => {
          const paletteKey = event.target.value;
          dispatch({
            format: {
              palette: chartPaletteKeyValues[paletteKey],
              paletteKey,
            },
            id,
            type: UPDATE_BLOCK_FORMAT,
          });
        })}
      >
        <MenuItem value={'default'}>
          <SidebarSelectLabel color={chartPaletteKeyValues.default[3]}>
            General
          </SidebarSelectLabel>
        </MenuItem>

        <MenuItem value={'mcKinseyDeep'}>
          <SidebarSelectLabel color={chartPaletteKeyValues.mcKinseyDeep[0]}>
            McKinsey Deep
          </SidebarSelectLabel>
        </MenuItem>

        <MenuItem value={'mcKinseyLight'}>
          <SidebarSelectLabel color={chartPaletteKeyValues.mcKinseyLight[0]}>
            McKinsey Light
          </SidebarSelectLabel>
        </MenuItem>

        <MenuItem value={'bcg'}>
          <SidebarSelectLabel color={chartPaletteKeyValues.bcg[0]}>
            BCG
          </SidebarSelectLabel>
        </MenuItem>

        <MenuItem value={'black'}>
          <SidebarSelectLabel color={chartPaletteKeyValues.black[0]}>
            Black
          </SidebarSelectLabel>
        </MenuItem>
      </Select>
    </SidebarGroup>
  );
}

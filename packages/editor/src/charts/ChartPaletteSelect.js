// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarLabel,
  SidebarSelect,
  SidebarSelectLabel,
} from '../ui';
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { MenuItem } from '@seine/styles/mui-core.macro';
import {
  blockTypes,
  chartPaletteKeyValues,
  defaultChartFormat,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

type Props = {
  selectAs?: React.ComponentType,
};

/**
 * @description Buttons to select chart's default palette
 * param {Props} props
 * @returns {*}
 */
const ChartPaletteSelect = React.forwardRef(function ChartPaletteSelect(
  { selectAs: Select = SidebarSelect }: Props,
  ref
) {
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
    <SidebarGroup ref={ref}>
      <SidebarLabel>palette</SidebarLabel>
      <Select
        value={paletteKey}
        name={'palette'}
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
});

export default ChartPaletteSelect;

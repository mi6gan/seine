// @flow
import * as React from 'react';
import { chartPaletteKeyValues, defaultChartFormat } from '@seine/content';
import { blockTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import styled from 'styled-components/macro';
import { Box, MenuItem, Typography, Select } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';

import {
  useEditorDispatch,
  useEditorSelector,
  useSelectedBlocks,
} from '../store';
import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';

const Label = styled(Box).attrs({
  component: Typography,
  variant: 'caption',
  display: 'inline',
})`
  font-weight: bold;
`;

/**
 * @description Buttons to select chart's default palette
 * @returns {*}
 */
export default function ChartPaletteSelect() {
  const device = useEditorSelector((state) => state.device);
  const dispatch = useEditorDispatch();
  const block =
    useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  const { id } = block;
  const { paletteKey = defaultChartFormat.paletteKey } =
    (block && block.format && block.format[device]) ||
    block.format ||
    defaultChartFormat;
  return (
    <SidebarGroup alignItems={'center'}>
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
          <Label color={chartPaletteKeyValues.default[3]}>
            General Palette
          </Label>
        </MenuItem>

        <MenuItem value={'mcKinseyDeep'}>
          <Label color={chartPaletteKeyValues.mcKinseyDeep[0]}>
            McKinsey Deep
          </Label>
        </MenuItem>

        <MenuItem value={'mcKinseyLight'}>
          <Label color={chartPaletteKeyValues.mcKinseyLight[0]}>
            McKinsey Light
          </Label>
        </MenuItem>

        <MenuItem value={'bcg'}>
          <Label color={chartPaletteKeyValues.bcg[0]}>BCG</Label>
        </MenuItem>

        <MenuItem value={'black'}>
          <Label color={chartPaletteKeyValues.black[0]}>Black</Label>
        </MenuItem>
      </Select>
    </SidebarGroup>
  );
}

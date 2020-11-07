// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
} from '../ui';
import { useBlocksDispatch } from '../blocks';

import ChartPaletteSelect from './ChartPaletteSelect';
import ChartStructureGroup from './ChartStructureGroup';
import ChartElementColorButton from './ChartElementColorButton';
import useChartBlock from './useChartBlock';

import { Checkbox } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';
import { chartTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    id,
    format: { kind, units, fraction, legend, xAxis, yAxis },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  const formatInput = useAutoCallback(
    ({ currentTarget: { value, name, type } }) => {
      dispatch({
        id,
        type: UPDATE_BLOCK_FORMAT,
        format: { [name]: type === 'number' ? +value : value },
      });
    }
  );
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <SidebarGroup>
          <SidebarLabel>units</SidebarLabel>
          <SidebarInput
            disabled={!id}
            value={units}
            name={'units'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>fraction</SidebarLabel>
          <SidebarInput
            disabled={!id}
            value={fraction}
            name={'fraction'}
            type={'number'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <ChartPaletteSelect />

        <SidebarGroup>
          <SidebarLabel>legend</SidebarLabel>
          <Checkbox
            checked={!!legend}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { legend: !legend },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(kind !== chartTypes.BAR && { display: 'none' })}>
          <SidebarLabel>x axis</SidebarLabel>
          <Checkbox
            checked={!!xAxis}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { xAxis: !xAxis },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(kind === chartTypes.BAR && { display: 'none' })}>
          <SidebarLabel>y axis</SidebarLabel>
          <Checkbox
            checked={!!yAxis}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { yAxis: !yAxis },
              });
            })}
          />
        </SidebarGroup>
      </SidebarSection>

      <SidebarSection>
        <Box
          as={SidebarHeading}
          display={'flex'}
          justifyContent={'space-between'}
        >
          Element
          <ChartStructureGroup />
        </Box>
        <ChartElementColorButton />
      </SidebarSection>
    </>
  );
}

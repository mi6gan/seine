// @flow
import * as React from 'react';
import { Box, Checkbox } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';
import { UPDATE_BLOCK_FORMAT, chartTypes } from '@seine/core';

import SidebarSection from '../ui/SidebarSection';
import SidebarHeading from '../ui/SidebarHeading';
import { useBlocksDispatch } from '../context';
import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarInput from '../ui/SidebarInput';

import ChartPaletteSelect from './ChartPaletteSelect';
import ChartStructureGroup from './ChartStructureGroup';
import ChartElementColorButton from './ChartElementColorButton';
import useChartBlock from './useChartBlock';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    id,
    format: { kind, units, minValue, maxValue, dx, dy, fraction, legend },
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

        <SidebarGroup display={kind !== chartTypes.PIE ? 'flex' : 'none'}>
          <SidebarLabel>limits</SidebarLabel>
          <SidebarInput
            disabled={!id}
            value={minValue}
            name={'minValue'}
            type={'number'}
            onChange={formatInput}
          />
          <SidebarInput
            disabled={!id}
            value={maxValue}
            name={'maxValue'}
            type={'number'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <SidebarGroup display={kind !== chartTypes.PIE ? 'flex' : 'none'}>
          <SidebarLabel>step</SidebarLabel>
          <SidebarInput
            hidden={kind !== chartTypes.BAR}
            disabled={!id}
            value={dx}
            name={'dx'}
            type={'number'}
            onChange={formatInput}
          />
          <SidebarInput
            hidden={kind === chartTypes.BAR}
            disabled={!id}
            value={dy}
            name={'dy'}
            type={'number'}
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

        <SidebarGroup alignItems={'center'}>
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
      </SidebarSection>

      <SidebarSection>
        <Box
          component={SidebarHeading}
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

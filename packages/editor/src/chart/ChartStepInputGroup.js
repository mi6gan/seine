// @flow
import * as React from 'react';
import { blockTypes, chartTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultBarChartFormat } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch, useBlocksSelector } from '../context';
import SidebarInput from '../ui/SidebarInput';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarGroup from '../ui/SidebarGroup';

import useChartBlock from './useChartBlock';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function ChartStepInputGroup() {
  const {
    format: { kind },
  } = useChartBlock();
  const device = useBlocksSelector((state) => state.device);
  const block =
    useBlocksSelector().find(({ type }) => type === blockTypes.CHART) || {};
  const { id } = block;
  const { dx, dy } =
    (block && block.format && block.format[device]) ||
    block.format ||
    defaultBarChartFormat;
  const dispatch = useBlocksDispatch();

  return (
    <SidebarGroup>
      <SidebarLabel>step</SidebarLabel>
      <SidebarInput
        hidden={kind === chartTypes.COLUMN || kind === chartTypes.BAR}
        disabled={!id}
        value={dx}
        inputProps={{ placeholder: 'x' }}
        onChange={useAutoCallback((event) =>
          dispatch({
            id,
            type: UPDATE_BLOCK_FORMAT,
            format: { dx: +event.currentTarget.value || null },
          })
        )}
        type={'number'}
      />
      <SidebarInput
        hidden={kind === chartTypes.BAR}
        disabled={!id}
        value={dy}
        inputProps={{ placeholder: 'y' }}
        onChange={useAutoCallback((event) =>
          dispatch({
            id,
            type: UPDATE_BLOCK_FORMAT,
            format: { dy: +event.currentTarget.value || null },
          })
        )}
        type={'number'}
      />
    </SidebarGroup>
  );
}

// @flow
import * as React from 'react';
import { blockTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultBarChartFormat } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch, useBlocksSelector } from '../context';
import SidebarInput from '../ui/SidebarInput';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarGroup from '../ui/SidebarGroup';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function ChartStepInputGroup({ hideX = false, hideY = false }) {
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
        hidden={hideX}
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
      />
      <SidebarInput
        hidden={hideY}
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
      />
    </SidebarGroup>
  );
}

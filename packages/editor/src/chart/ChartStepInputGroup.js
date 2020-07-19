// @flow
import * as React from 'react';
import { blockTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultBarChartFormat } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import {
  useEditorDispatch,
  useEditorSelector,
  useSelectedBlocks,
} from '../store';
import SidebarInput from '../ui/SidebarInput';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarGroup from '../ui/SidebarGroup';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function ChartStepInputGroup({ hideX = false, hideY = false }) {
  const device = useEditorSelector((state) => state.device);
  const block =
    useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  const { id } = block;
  const { dx, dy } =
    (block && block.format && block.format[device]) ||
    block.format ||
    defaultBarChartFormat;
  const dispatch = useEditorDispatch();

  return (
    <SidebarGroup>
      <SidebarLabel>Step</SidebarLabel>
      <SidebarInput
        hidden={hideX}
        disabled={!id}
        value={dx}
        inputProps={{ placeholder: 'X' }}
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
        inputProps={{ placeholder: 'Y' }}
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

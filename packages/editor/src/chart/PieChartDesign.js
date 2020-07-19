// @flow
import * as React from 'react';
import { blockTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultPieChartFormat } from '@seine/content';
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
export default function PieChartDesign() {
  const device = useEditorSelector((state) => state.device);
  const block =
    useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  const { id } = block;
  const { units = defaultPieChartFormat.units } =
    (block && block.format && block.format[device]) ||
    block.format ||
    defaultPieChartFormat;
  const dispatch = useEditorDispatch();
  return (
    <SidebarGroup>
      <SidebarLabel>units</SidebarLabel>
      <SidebarInput
        disabled={!id}
        value={units}
        onChange={useAutoCallback((event) =>
          dispatch({
            id,
            type: UPDATE_BLOCK_FORMAT,
            format: { units: event.currentTarget.value },
          })
        )}
      />
    </SidebarGroup>
  );
}

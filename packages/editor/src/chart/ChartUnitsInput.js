// @flow
import * as React from 'react';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import { useEditorDispatch } from '../store';
import SidebarInput from '../ui/SidebarInput';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarGroup from '../ui/SidebarGroup';

import useChartBlock from './useChartBlock';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function ChartUnitsInput() {
  const {
    id,
    format: { units },
  } = useChartBlock();
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

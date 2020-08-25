import * as React from 'react';
import { Checkbox } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';

import SidebarLabel from '../ui/SidebarLabel';
import SidebarGroup from '../ui/SidebarGroup';
import { useBlocksDispatch } from '../context';

import useChartBlock from './useChartBlock';

// eslint-disable-next-line
export default function ChartLegendSwitch() {
  const {
    format: { legend },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  return (
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
  );
}

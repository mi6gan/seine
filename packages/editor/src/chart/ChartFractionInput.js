// @flow
import * as React from 'react';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultChartFraction } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarInput from '../ui/SidebarInput';
import { useBlocksDispatch } from '../store';

import useChartBlock from './useChartBlock';

/**
 * @description Input that changes minimum value (of y axis).
 * @returns {React.Node}
 */
export default function ChartFractionInput() {
  const {
    id,
    format: { fraction = defaultChartFraction },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  return (
    <SidebarGroup>
      <SidebarLabel>fraction</SidebarLabel>
      <SidebarInput
        disabled={!id}
        value={fraction || ''}
        onChange={useAutoCallback((event) =>
          dispatch({
            id,
            type: UPDATE_BLOCK_FORMAT,
            format: { fraction: +event.currentTarget.value },
          })
        )}
        type={'number'}
      />
    </SidebarGroup>
  );
}

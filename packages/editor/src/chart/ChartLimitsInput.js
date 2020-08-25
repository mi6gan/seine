// @flow
import * as React from 'react';
import { chartTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultChartMinValue } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarInput from '../ui/SidebarInput';
import { useBlocksDispatch } from '../context';

import useChartBlock from './useChartBlock';

/**
 * @description Input that changes minimum value (of y axis).
 * @returns {React.Node}
 */
export default function ChartLimitsInput() {
  const {
    id,
    format: { kind, minValue = defaultChartMinValue, maxValue },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();

  return (
    <SidebarGroup display={kind !== chartTypes.PIE ? 'flex' : 'none'}>
      <SidebarLabel>limits</SidebarLabel>
      <SidebarInput
        disabled={!id}
        value={minValue}
        onChange={useAutoCallback((event) =>
          dispatch({
            id,
            type: UPDATE_BLOCK_FORMAT,
            format: { minValue: +event.currentTarget.value },
          })
        )}
        type={'number'}
      />
      <SidebarInput
        disabled={!id}
        value={maxValue}
        onChange={useAutoCallback((event) =>
          dispatch({
            id,
            type: UPDATE_BLOCK_FORMAT,
            format: { maxValue: +event.currentTarget.value },
          })
        )}
        type={'number'}
      />
    </SidebarGroup>
  );
}

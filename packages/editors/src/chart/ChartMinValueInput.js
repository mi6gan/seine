// @flow
import { ToolbarInput } from '@seine/ui';
import type {
  BlockId,
  BlocksAction,
  ChartBody,
  ChartFormat,
} from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import * as React from 'react';

type Props = {
  body: ChartBody,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Input that changes minimum value (of y axis).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartMinValueInput({ dispatch, format }: Props) {
  return (
    <ToolbarInput
      onChange={React.useCallback(
        ({ currentTarget }) =>
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: { minValue: +currentTarget.value },
          }),
        [dispatch]
      )}
      placeholder={'min'}
      type={'number'}
      value={typeof format.minValue === 'number' ? format.minValue : ''}
    />
  );
}

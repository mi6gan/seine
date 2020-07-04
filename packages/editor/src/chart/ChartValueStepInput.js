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
 * @description Input that changes value step (of y axis).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartValueStepInput({ dispatch, format }: Props) {
  return (
    <ToolbarInput
      type={'number'}
      onChange={React.useCallback(
        ({ currentTarget }) =>
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: { dy: +currentTarget.value },
          }),
        [dispatch]
      )}
      placeholder={'step'}
      value={typeof format.dy === 'number' ? format.dy : ''}
      min={0}
    />
  );
}

// @flow
import * as React from 'react';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import ChartValueInput from './ChartValueInput';
import useDispatchElements from './useDispatchElements';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element value input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartElementValueInput({
  meta: { index, value },
  ...inputProps
}: Props) {
  const dispatchElements = useDispatchElements();
  return (
    <ChartValueInput
      {...inputProps}
      value={value}
      onChange={useAutoCallback(({ currentTarget }) => {
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT,
          index,
          body: { value: +currentTarget.value },
        });
      })}
    />
  );
}

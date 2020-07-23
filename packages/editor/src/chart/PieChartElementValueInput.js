// @flow
import * as React from 'react';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import { SvgInput } from '@seine/ui';

import useChartDispatchElements from './useChartDispatchElements';

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
  const dispatchElements = useChartDispatchElements();
  return (
    <SvgInput
      {...inputProps}
      type={'number'}
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

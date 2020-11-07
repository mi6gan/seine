// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import ChartValueInput from './ChartValueInput';
import useChartDispatchElements from './useChartDispatchElements';

import { UPDATE_BLOCK_ELEMENT } from '@seine/core';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element value input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
const CharElementValueInput = React.forwardRef(function ChartElementValueInput(
  { meta: { index, value }, ...inputProps }: Props,
  ref
) {
  const dispatchElements = useChartDispatchElements();
  return (
    <ChartValueInput
      {...inputProps}
      ref={ref}
      value={value}
      onChange={useAutoCallback(({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT,
          index,
          body: { value: +currentTarget.value },
        })
      )}
    />
  );
});

export default CharElementValueInput;

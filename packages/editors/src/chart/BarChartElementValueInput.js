// @flow
import * as React from 'react';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import ChartValueInput from './ChartValueInput';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element value input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function BarChartElementValueInput(
  {
    dispatch,
    dispatchElements,
    editor,
    meta: { index, value },
    ...typographyProps
  }: Props,
  ref
) {
  return (
    <ChartValueInput
      {...typographyProps}
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

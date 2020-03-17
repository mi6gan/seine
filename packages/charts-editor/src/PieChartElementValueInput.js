// @flow
import * as React from 'react';
import { SvgInput } from '@seine/ui';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

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
    ...inputProps
  }: Props,
  ref
) {
  return (
    <SvgInput
      {...inputProps}
      ref={ref}
      type={'number'}
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

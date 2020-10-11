// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { SvgInput } from '../ui';

import { useChartDispatchElements } from '.';

import { UPDATE_BLOCK_ELEMENT } from '@seine/core';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function BarChartElementTitleInput(
  { meta: { index, title }, ...inputProps }: Props,
  ref
) {
  const dispatchElements = useChartDispatchElements();
  return (
    <SvgInput
      {...inputProps}
      ref={ref}
      value={title}
      onChange={useAutoCallback(({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT,
          index,
          body: { title: currentTarget.value },
        })
      )}
    />
  );
});
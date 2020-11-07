// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { SvgInput } from '../ui';

import useChartDispatchElements from './useChartDispatchElements';

import { UPDATE_BLOCK_ELEMENT_BY_TITLE } from '@seine/core';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
const ChartElementTitleInput = React.forwardRef(function ChartElementTitleInput(
  { meta: title, ...inputProps }: Props,
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
          type: UPDATE_BLOCK_ELEMENT_BY_TITLE,
          title,
          body: { title: currentTarget.value },
        })
      )}
    />
  );
});

export default ChartElementTitleInput;

// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { UPDATE_BLOCK_ELEMENT_BY_GROUP } from '@seine/core';
import { SvgInput, useChartDispatchElements } from '@seine/editor';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element value input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function ChartGroupTitleInput(
  { meta: group, ...inputProps }: Props,
  ref
) {
  const dispatchElements = useChartDispatchElements();
  return (
    <SvgInput
      {...inputProps}
      ref={ref}
      value={group}
      onChange={useAutoCallback(({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
          group,
          body: { group: currentTarget.value },
        })
      )}
    />
  );
});

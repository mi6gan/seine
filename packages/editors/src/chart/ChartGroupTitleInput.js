// @flow
import * as React from 'react';
import { SvgInput } from '@seine/ui';
import { UPDATE_BLOCK_ELEMENT_BY_GROUP } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element value input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function ChartGroupTitleInput(
  { dispatch, dispatchElements, editor, meta: group, ...inputProps }: Props,
  ref
) {
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

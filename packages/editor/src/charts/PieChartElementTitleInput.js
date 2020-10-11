// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import useChartDispatchElements from './useChartDispatchElements';

import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { SvgInput } from '@seine/editor';

type Props = {
  children?: any,
};

/**
 * @description Pie chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartElementTitleInput({
  meta: { title, index },
  ...inputProps
}) {
  const dispatchElements = useChartDispatchElements();

  return (
    <SvgInput
      {...inputProps}
      multiline
      height={'auto'}
      value={title}
      whiteSpace={'pre'}
      onChange={useAutoCallback(({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT,
          index,
          body: { title: currentTarget.value },
        })
      )}
    />
  );
}

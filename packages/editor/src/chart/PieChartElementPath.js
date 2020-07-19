// @flow
import * as React from 'react';
import { SELECT_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

type Props = {
  children?: any,
};

/**
 * @description Pie chart selectable slice.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartElementPath({
  dispatch,
  dispatchElements,
  editor,
  meta: { index },
  ...pathProps
}: Props) {
  return (
    <g>
      <path
        {...pathProps}
        onClick={useAutoCallback((event) => {
          if (editor.selection !== index) {
            event.stopPropagation();
            event.preventDefault();
            dispatchElements({
              index,
              type: SELECT_BLOCK_ELEMENT,
            });
          }
        })}
      />
      {editor.selection === index && (
        <path
          {...pathProps}
          style={{
            opacity: 0.15,
            fill: 'url(#selectionPattern)',
            pointerEvents: 'none',
          }}
        />
      )}
    </g>
  );
}

// @flow
import * as React from 'react';
import { SELECT_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import useChartBlock from './useChartBlock';
import useDispatchElements from './useDispatchElements';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function GroupedChartElementRect({
  meta: { index },
  ...rectProps
}: Props) {
  const { editor } = useChartBlock();
  const dispatchElements = useDispatchElements();
  return (
    <g>
      <rect
        {...rectProps}
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
        <rect
          {...rectProps}
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

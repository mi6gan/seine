// @flow
import * as React from 'react';
import { DESELECT_BLOCK_ELEMENT, SELECT_BLOCK_ELEMENT } from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartElementRect({
  dispatch,
  dispatchElements,
  editor,
  meta: { index },
  ...rectProps
}: Props) {
  return (
    <ClickAwayListener
      onClickAway={(event) =>
        !(event.target instanceof HTMLButtonElement) &&
        dispatchElements({
          type: DESELECT_BLOCK_ELEMENT,
          index,
        })
      }
    >
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
    </ClickAwayListener>
  );
}

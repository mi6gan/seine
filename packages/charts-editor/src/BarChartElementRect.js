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
export default function BarChartElementRect({
  dispatch,
  dispatchElements,
  editor,
  meta: { index },
  ...rectProps
}: Props) {
  return (
    <ClickAwayListener
      onClickAway={(event) => {
        if (
          event.target &&
          !(
            event.target === document.body ||
            event.target instanceof HTMLButtonElement ||
            event.target instanceof HTMLInputElement ||
            (event.target instanceof HTMLDivElement &&
              event.target.parentElement instanceof HTMLSpanElement) ||
            event.target.style.position === 'absolute'
          )
        ) {
          dispatchElements({
            type: DESELECT_BLOCK_ELEMENT,
            index,
          });
        }
      }}
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

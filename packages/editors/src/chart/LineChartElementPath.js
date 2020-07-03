// @flow
import * as React from 'react';
import { DESELECT_BLOCK_ELEMENT, SELECT_BLOCK_ELEMENT } from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';

type Props = {
  children?: any,
};

/**
 * @description Line chart selectable path.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartElementPath({
  dispatch,
  dispatchElements,
  editor,
  meta: { index },
  ...pathProps
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
        <path {...pathProps} />
        <path
          onClick={(event) => {
            if (editor.selection !== index) {
              event.stopPropagation();
              event.preventDefault();
              dispatchElements({
                index,
                type: SELECT_BLOCK_ELEMENT,
              });
            }
          }}
          {...pathProps}
          {...(editor.selection === index
            ? {
                strokeDasharray: 0.5,
                strokeWidth: 0.15,
                stroke: 'black',
              }
            : {
                strokeWidth: 4,
                stroke: 'transparent',
                markerEnd: 'none',
                markerMid: 'none',
                markerStart: 'none',
              })}
        />
      </g>
    </ClickAwayListener>
  );
}

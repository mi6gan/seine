// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import { Box } from '@seine/styles';
import { Shape } from '@seine/content';
import { useBlocksDispatch, useEditorSelector } from '@seine/editor';
import { DESELECT_ALL_BLOCKS, SELECT_BLOCK, shapeTypes } from '@seine/core';

const ShapeFrame = React.forwardRef(function ShapeFrame(props, ref) {
  const { id, x, y, width, height, cx, cy, rx, ry, kind } = props;
  const dispatch = useBlocksDispatch();
  const selected = useEditorSelector(
    useAutoCallback(
      ({ selection }) => selection.length === 1 && selection.includes(id)
    )
  );
  const box = useAutoMemo(
    kind === shapeTypes.ELLIPSE
      ? {
          x: cx - rx,
          y: cy - ry,
          width: 2 * rx,
          height: 2 * ry,
        }
      : kind === shapeTypes.RECT
      ? {
          x,
          y,
          width,
          height,
        }
      : {}
  );

  return (
    <>
      <Shape {...props} ref={ref} />
      <Box
        as={'rect'}
        stroke={selected ? 'primary.main' : 'transparent'}
        fill={'transparent'}
        cursor={'move'}
        onClick={useAutoCallback((event) => {
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: DESELECT_ALL_BLOCKS,
          });
          dispatch({
            type: SELECT_BLOCK,
            id,
            ...(event.ctrlKey && {
              modifier: selected ? 'sub' : 'add',
            }),
          });
        })}
        {...box}
      />
    </>
  );
});

export default ShapeFrame;

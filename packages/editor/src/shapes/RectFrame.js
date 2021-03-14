// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import ShapeFrameBox from './ShapeFrameBox';

import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useBlocksDispatch } from '@seine/editor';
import { Shape } from '@seine/content';

// eslint-disable-next-line
const RectFrame = React.forwardRef(function PathShapeEditor(
  { id, d, transform, x, y, width, height, ...props },
  ref
) {
  const dispatch = useBlocksDispatch();
  return (
    <Shape
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      {...props}
      ref={ref}
    >
      <ShapeFrameBox
        id={id}
        onChange={useAutoCallback((box) => {
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: box,
          });
        })}
        x={x}
        y={y}
        width={width}
        height={height}
      />
    </Shape>
  );
});

export default RectFrame;

// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import ShapeFrameBox from './ShapeFrameBox';

import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useBlocksDispatch } from '@seine/editor';
import { Shape } from '@seine/content';

// eslint-disable-next-line
const EllipseFrame = React.forwardRef(function PathShapeEditor(
  { id, d, transform, cx, cy, rx, ry, ...props },
  ref
) {
  const dispatch = useBlocksDispatch();
  return (
    <Shape id={id} cx={cx} cy={cy} rx={rx} ry={ry} {...props} ref={ref}>
      <ShapeFrameBox
        id={id}
        onChange={useAutoCallback((box) => {
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: {
              cx: box.x + box.width / 2,
              cy: box.y + box.height / 2,
              rx: box.width / 2,
              ry: box.height / 2,
            },
          });
        })}
        x={cx - rx}
        y={cy - ry}
        width={2 * rx}
        height={2 * ry}
      />
    </Shape>
  );
});

export default EllipseFrame;

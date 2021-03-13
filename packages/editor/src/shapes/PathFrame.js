// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import ShapeFrameBox from './ShapeFrameBox';

import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useBlocksDispatch } from '@seine/editor';
import { Shape } from '@seine/content';

// eslint-disable-next-line
const PathFrame = React.forwardRef(function PathShapeEditor(
  { id, d, ...props },
  ref
) {
  const dispatch = useBlocksDispatch();
  const [values, args] = useAutoMemo(
    d
      .match(/\d+(,\d+)?/g)
      .map((p) => p.split(',').map((v) => +v))
      .reduce(
        (acc, [x, y]) => [
          [...acc[0], x],
          [...acc[1], y],
        ],
        [[], []]
      )
  );
  const x = Math.min(...values);
  const y = Math.min(...args);
  return (
    <>
      <Shape id={id} d={d} {...props} ref={ref}>
        <ShapeFrameBox
          id={id}
          onChange={useAutoCallback((box) => {
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: { transform: `translate(${box.x}, ${box.y})` },
            });
          })}
          x={x}
          y={y}
          width={Math.max(...values) - x}
          height={Math.max(...args) - y}
        />
      </Shape>
    </>
  );
});

export default PathFrame;

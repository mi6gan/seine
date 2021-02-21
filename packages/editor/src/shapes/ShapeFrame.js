// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { Box } from '@seine/styles';
import { Shape } from '@seine/content';
import {
  DESELECT_ALL_BLOCKS,
  SELECT_BLOCK,
  shapeTypes,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

const MIN_WIDTH = 40;
const MIN_HEIGHT = 40;

const ResizePath = styled(Box).attrs({
  as: 'rect',
  x: -MIN_WIDTH / 10,
  y: -MIN_HEIGHT / 10,
  width: MIN_WIDTH / 5,
  height: MIN_HEIGHT / 5,
  stroke: 'primary.main',
  strokeWidth: 1,
  fill: 'primary.main',
  opacity: 0.75,
  shapeRendering: 'crispEdges',
})``;

const ShapeFrame = React.forwardRef(function ShapeFrame(
  { transform, ...props },
  ref
) {
  const { id, x, y, width, height, cx, cy, rx, ry, kind, d } = props;
  const dispatch = useBlocksDispatch();
  const selected = useEditorSelector(
    useAutoCallback(
      ({ selection }) => selection.length === 1 && selection.includes(id)
    )
  );
  const box = useAutoMemo(() => {
    switch (kind) {
      case shapeTypes.ELLIPSE:
        return {
          x: cx - rx,
          y: cy - ry,
          width: 2 * rx,
          height: 2 * ry,
        };
      case shapeTypes.RECT:
        return {
          x,
          y,
          width,
          height,
        };
      case shapeTypes.PATH: {
        const [values, args] = d
          .match(/\d+(,\d+)?/g)
          .map((p) => p.split(',').map((v) => +v))
          .reduce(
            (acc, [x, y]) => [
              [...acc[0], x],
              [...acc[1], y],
            ],
            [[], []]
          );
        const x = Math.min(...values);
        const y = Math.min(...args);
        const width = Math.max(...values) - x;
        const height = Math.max(...args) - y;
        return {
          x,
          y,
          width,
          height,
        };
      }
      default:
        return {};
    }
  });

  const bound = useAutoMemo(() => {
    const result = {
      ...box,
      ...(box.width < MIN_WIDTH && {
        x: box.x - (MIN_WIDTH - box.width) / 2,
        width: MIN_WIDTH,
      }),
      ...(box.height < MIN_HEIGHT && {
        y: box.y - (MIN_HEIGHT - box.height) / 2,
        height: MIN_HEIGHT,
      }),
    };
    result.x -= 2;
    result.width += 4;
    result.y -= 2;
    result.height += 4;
    return result;
  });

  const setBox = useAutoCallback((box) => {
    if (box.width < 0 || box.height < 0) {
      setMode(null);
    } else {
      boxRef.current = box;
      switch (kind) {
        case shapeTypes.ELLIPSE:
          return dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: {
              cx: box.x + box.width / 2,
              cy: box.y + box.height / 2,
              rx: box.width / 2,
              ry: box.height / 2,
            },
          });
        case shapeTypes.RECT:
          return dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: box,
          });
        default:
          return dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: { transform: `translate(${box.x}, ${box.y})` },
          });
      }
    }
  });

  const boxRef = React.useRef(box);

  const [mode, setMode] = React.useState(null);

  useAutoEffect(() => {
    const move = (event) => {
      const {
        current: { x, y, width, height },
      } = boxRef;
      const dx = event.movementX;
      const dy = event.movementY;
      if (mode === 'move') {
        setBox({
          width,
          height,
          x: x + dx,
          y: y + dy,
        });
      } else if (mode) {
        const resize = mode.match(/^resize\((.+),(.+),(.+),(.+)\)$/);
        if (resize) {
          const [, kx, ky, kw, kh] = resize;
          return setBox({
            x: x - kx * dx,
            y: y - ky * dy,
            width: width + kw * dx,
            height: height + kh * dy,
          });
        }
      }
    };
    document.addEventListener('mousemove', move);
    return () => {
      document.removeEventListener('mousemove', move);
    };
  });

  const selectResizeMode = useAutoCallback((event) => {
    setMode(event.currentTarget.dataset.mode);
  });

  useAutoEffect(() => {
    const clearMode = () => {
      setMode(null);
    };
    document.addEventListener('mouseup', clearMode);
    return () => {
      document.removeEventListener('mouseup', clearMode);
    };
  });

  return (
    <g transform={transform}>
      <Shape {...props} ref={ref} />
      <g {...(!selected && { display: 'none' })}>
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x}, ${bound.y})`}
          cursor={'nwse-resize'}
          data-mode={'resize(-1,-1,-1,-1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width / 2}, ${bound.y})`}
          cursor={'ns-resize'}
          data-mode={'resize(0,-1,0,-1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width}, ${bound.y})`}
          cursor={'nesw-resize'}
          data-mode={'resize(0,-1,1,-1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width}, ${
            bound.y + bound.height / 2
          })`}
          cursor={'ew-resize'}
          data-mode={'resize(0,0,1,0)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width}, ${
            bound.y + bound.height
          })`}
          cursor={'nwse-resize'}
          data-mode={'resize(0,0,1,1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width / 2}, ${
            bound.y + bound.height
          })`}
          cursor={'ns-resize'}
          data-mode={'resize(0,0,0,1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x}, ${bound.y + bound.height})`}
          cursor={'nesw-resize'}
          data-mode={'resize(-1,0,-1,1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x}, ${bound.y + bound.height / 2})`}
          cursor={'ew-resize'}
          data-mode={'resize(-1,0,-1,0)'}
        />
      </g>
      <Box
        as={'rect'}
        shapeRendering={'crispEdges'}
        stroke={selected ? 'primary.main' : 'transparent'}
        fill={'transparent'}
        strokeDasharray={'6 3'}
        cursor={selected ? mode || 'move' : 'pointer'}
        onMouseDown={useAutoCallback(() => {
          setMode('move');
        })}
        onClick={useAutoCallback((event) => {
          if (!selected) {
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
          }
        })}
        x={bound.x + 2}
        y={bound.y + 2}
        width={bound.width - 4}
        height={bound.height - 4}
      />
    </g>
  );
});

export default ShapeFrame;

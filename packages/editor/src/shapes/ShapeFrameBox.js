// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { Box } from '@seine/styles';
import { DESELECT_ALL_BLOCKS, SELECT_BLOCK } from '@seine/core';

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

// eslint-disable-next-line
export default function ShapeFrameBox({ id, onChange, x, y, width, height }) {
  const dispatch = useBlocksDispatch();
  const selected = useEditorSelector(
    useAutoCallback(
      ({ selection }) => selection.length === 1 && selection.includes(id)
    )
  );

  const bound = useAutoMemo({
    x: (width < MIN_WIDTH ? x - (MIN_WIDTH - width) / 2 : x) - 2,
    y: (height < MIN_HEIGHT ? y - (MIN_HEIGHT - height) / 2 : y) - 2,
    width: Math.max(width, MIN_WIDTH) + 4,
    height: Math.max(height, MIN_HEIGHT) + 4,
  });

  const boxRef = React.useRef({ x, y, width, height });

  const [mode, setMode] = React.useState(null);
  const setBox = useAutoCallback((box) => {
    boxRef.current = box;
    onChange(box);
  });

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
    <>
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
        strokeWidth={1}
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
    </>
  );
}

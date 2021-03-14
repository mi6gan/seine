// @flow
import * as React from 'react';
import {
  useAutoCallback,
  useAutoEffect,
  useAutoLayoutEffect,
  useAutoMemo,
} from 'hooks.macro';
import styled from 'styled-components/macro';

import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { shapeEditorModeSelector } from './selectors';

import { Box } from '@seine/styles';
import {
  DESELECT_ALL_BLOCKS,
  SELECT_BLOCK,
  UPDATE_BLOCK_EDITOR,
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

// eslint-disable-next-line
export default function ShapeFrameBox({ id, onChange, x, y, width, height }) {
  const dispatch = useBlocksDispatch();
  const selected = useEditorSelector(
    useAutoCallback(
      ({ selection }) => selection.length === 1 && selection.includes(id)
    )
  );
  const match = useEditorSelector(shapeEditorModeSelector);
  const { action, mode, state } = match.groups;
  const setMode = useAutoCallback((value) => {
    dispatch({
      id,
      type: UPDATE_BLOCK_EDITOR,
      editor: { mode: value },
    });
  });

  const boxRef = React.useRef({ x, y, width, height });

  const bound = useAutoMemo({
    x: (width < MIN_WIDTH ? x - (MIN_WIDTH - width) / 2 : x) - 2,
    y: (height < MIN_HEIGHT ? y - (MIN_HEIGHT - height) / 2 : y) - 2,
    width: Math.max(width, MIN_WIDTH) + 4,
    height: Math.max(height, MIN_HEIGHT) + 4,
  });

  const setBox = useAutoCallback((value) => {
    boxRef.current = value;
    onChange(value);
  });

  const isMoveOrResize = selected && (action === 'move' || action === 'resize');

  const actionRef = React.useRef(action);
  const stateRef = React.useRef(state);
  const modeRef = React.useRef(mode);

  useAutoEffect(() => {
    actionRef.current = action;
    stateRef.current = state;
    modeRef.current = mode;
  });

  useAutoLayoutEffect(() => {
    if (isMoveOrResize) {
      const move = (event) => {
        if (stateRef.current === 'off') {
          actionRef.current = 'move';
          stateRef.current = 'on';
          modeRef.current = 'box';
          setMode(`move(box,on)`);
        }
        const dx = event.movementX;
        const dy = event.movementY;
        if (actionRef.current === 'move') {
          setBox({
            width: boxRef.current.width,
            height: boxRef.current.height,
            x: boxRef.current.x + dx,
            y: boxRef.current.y + dy,
          });
        } else if (actionRef.current === 'resize') {
          const [, , , , kx, ky, kw, kh] = match;
          return setBox({
            x: boxRef.current.x - kx * dx,
            y: boxRef.current.y - ky * dy,
            width: boxRef.current.width + kw * dx,
            height: boxRef.current.height + kh * dy,
          });
        }
      };
      document.addEventListener('mousemove', move);
      return () => {
        document.removeEventListener('mousemove', move);
      };
    }
  });

  useAutoLayoutEffect(() => {
    if (isMoveOrResize) {
      const update = () => {
        setMode(
          `edit(${
            stateRef.current === 'on' || modeRef.current === 'shape'
              ? 'box'
              : 'shape'
          },off)`
        );
      };
      document.addEventListener('mouseup', update);
      return () => {
        document.removeEventListener('mouseup', update);
      };
    }
  });

  const selectResizeMode = useAutoCallback((event) => {
    setMode(event.currentTarget.dataset.mode);
  });

  return (
    <>
      <g
        {...((!selected || mode === 'shape') && {
          display: 'none',
        })}
      >
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x - 2}, ${bound.y - 2})`}
          cursor={'nwse-resize'}
          data-mode={'resize(box,on,-1,-1,-1,-1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width / 2}, ${bound.y - 2})`}
          cursor={'ns-resize'}
          data-mode={'resize(box,on,0,-1,0,-1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + 2 + bound.width}, ${bound.y - 2})`}
          cursor={'nesw-resize'}
          data-mode={'resize(box,on,0,-1,1,-1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + 2 + bound.width}, ${
            bound.y + bound.height / 2
          })`}
          cursor={'ew-resize'}
          data-mode={'resize(box,on,0,0,1,0)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + 2 + bound.width}, ${
            bound.y + 2 + bound.height
          })`}
          cursor={'nwse-resize'}
          data-mode={'resize(box,on,0,0,1,1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x + bound.width / 2}, ${
            bound.y + 2 + bound.height
          })`}
          cursor={'ns-resize'}
          data-mode={'resize(box,on,0,0,0,1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x - 2}, ${bound.y + 2 + bound.height})`}
          cursor={'nesw-resize'}
          data-mode={'resize(box,on,-1,0,-1,1)'}
        />
        <ResizePath
          onMouseDown={selectResizeMode}
          transform={`translate(${bound.x - 2}, ${bound.y + bound.height / 2})`}
          cursor={'ew-resize'}
          data-mode={'resize(box,on,-1,0,-1,0)'}
        />
      </g>
      <Box
        as={'rect'}
        shapeRendering={'crispEdges'}
        stroke={selected ? 'primary.main' : 'transparent'}
        strokeWidth={1}
        fill={'transparent'}
        strokeDasharray={'6 3'}
        cursor={selected ? 'move' : 'pointer'}
        x={bound.x + 2}
        y={bound.y + 2}
        width={bound.width - 4}
        height={bound.height - 4}
        onMouseDownCapture={useAutoCallback(() => {
          if (selected && action === 'edit') {
            setMode(`move(${mode},off)`);
          }
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
      />
    </>
  );
}

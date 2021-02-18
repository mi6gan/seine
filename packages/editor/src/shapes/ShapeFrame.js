// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import { Box } from '@seine/styles';
import { Shape } from '@seine/content';
import { useBlocksDispatch, useEditorSelector } from '@seine/editor';
import { DESELECT_ALL_BLOCKS, SELECT_BLOCK, shapeTypes } from '@seine/core';

const MIN_WIDTH = 20;
const MIN_HEIGHT = 20;

const ResizePath = styled(Box).attrs({
  as: 'path',
  d: `M -${MIN_WIDTH / 6} -${MIN_HEIGHT / 12} 0 ${MIN_HEIGHT / 12} ${
    MIN_WIDTH / 6
  } -${MIN_HEIGHT / 12}`,
})``;

const ShapeFrame = React.forwardRef(function ShapeFrame(props, ref) {
  const { id, x, y, width, height, cx, cy, rx, ry, kind } = props;
  const dispatch = useBlocksDispatch();
  const selected = useEditorSelector(
    useAutoCallback(
      ({ selection }) => selection.length === 1 && selection.includes(id)
    )
  );
  const box = useAutoMemo(() => {
    const result =
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
        : {};
    if (result.width < MIN_WIDTH) {
      result.x -= (MIN_WIDTH - result.width) / 2;
      result.width = MIN_WIDTH;
    }
    if (result.height < MIN_HEIGHT) {
      result.y -= (MIN_HEIGHT - result.height) / 2;
      result.height = MIN_HEIGHT;
    }
    result.x -= 2;
    result.width += 3;
    result.y -= 2;
    result.height += 3;
    return result;
  });

  return (
    <>
      <Shape {...props} ref={ref} />
      {selected && (
        <>
          <ResizePath
            transform={`translate(${box.x}, ${box.y}) rotate(135)`}
            cursor={'nwse-resize'}
          />
          <ResizePath
            transform={`translate(${box.x + box.width / 2}, ${
              box.y
            }) rotate(180)`}
            cursor={'ns-resize'}
          />
          <ResizePath
            transform={`translate(${box.x + box.width}, ${box.y}) rotate(225)`}
            cursor={'nesw-resize'}
          />
          <ResizePath
            transform={`translate(${box.x + box.width}, ${
              box.y + box.height / 2
            }) rotate(270)`}
            cursor={'ew-resize'}
          />
          <ResizePath
            transform={`translate(${box.x + box.width}, ${
              box.y + box.height
            }) rotate(315)`}
            cursor={'nwse-resize'}
          />
          <ResizePath
            transform={`translate(${box.x + box.width / 2}, ${
              box.y + box.height
            })`}
            cursor={'ns-resize'}
          />
          <ResizePath
            transform={`translate(${box.x}, ${box.y + box.height}) rotate(45)`}
            cursor={'nesw-resize'}
          />
          <ResizePath
            transform={`translate(${box.x}, ${
              box.y + box.height / 2
            }) rotate(90)`}
            cursor={'ew-resize'}
          />
        </>
      )}
      <Box
        as={'rect'}
        stroke={selected ? 'primary.main' : 'transparent'}
        fill={'transparent'}
        cursor={selected ? 'move' : 'pointer'}
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
        x={box.x + 2}
        y={box.y + 2}
        width={box.width - 3}
        height={box.height - 3}
      />
    </>
  );
});

export default ShapeFrame;

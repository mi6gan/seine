// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import ShapeFrameBox from './ShapeFrameBox';
import { shapeEditorModeSelector } from './selectors';

import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useBlocksDispatch, useEditorSelector } from '@seine/editor';
import { Shape } from '@seine/content';
import { Box } from '@seine/styles';

function PathPoint({ x, y }) {
  return <ellipse cx={x} cy={y} rx={1} ry={1} />;
}

// eslint-disable-next-line
const PathFrame = React.forwardRef(function PathShapeEditor(
  { id, d, ...props },
  ref
) {
  const match = useEditorSelector(shapeEditorModeSelector);
  const { action, mode } = match.groups;
  const dispatch = useBlocksDispatch();
  const commands = useAutoMemo(
    [...d.matchAll(/[HhVvLlMmTtQqSsCcAaZz]/g)].map(
      (
        current,
        index,
        {
          [index + 1]: next = {
            index: d.length,
          },
        }
      ) => [
        `${current}`,
        ...d
          .slice(current.index + 1, next.index)
          .split(/[\s,]+/)
          .map((v) => +v),
      ]
    )
  );

  const { x, y, width, height } = useAutoMemo(
    commands.reduce(
      (
        { x, y, width, height },
        [command, ...values],
        index,
        { [index - 1]: point }
      ) => {
        const commandSlug = command.toLowerCase();
        const start = (commandSlug === command && point) || [0, 0];
        const [xs, ys] =
          commandSlug === 'h'
            ? [[start[0] + point[0]], [start[1]]]
            : commandSlug === 'v'
            ? [[start[0]], [start[1] + point[1]]]
            : Array.from({
                length: parseInt(values.length / 2),
              }).reduce(
                ([xs, ys], _, index) => [
                  [...xs, start[0] + values[2 * index]],
                  [...ys, start[1] + values[2 * index + 1]],
                ],
                [[], []]
              );
        const right = Math.max(x === Infinity ? 0 : x + width, ...xs);
        const bottom = Math.max(y === Infinity ? 0 : y + height, ...ys);
        x = Math.min(x, ...xs);
        y = Math.min(y, ...ys);
        width = right - x;
        height = bottom - y;
        return { x, y, width, height };
      },
      { x: Infinity, y: Infinity, width: 0, height: 0 }
    )
  );

  const pointRef = React.useRef(null);

  return (
    <>
      <Shape id={id} d={d} {...props} ref={ref}>
        {action === 'edit' && mode === 'shape' && (
          <Box as={'g'} stroke={'primary.main'}>
            {commands.map(([command, ...values], key) => {
              let { current: point } = pointRef;
              pointRef.current = values.slice(-2);
              switch (command) {
                case 'M':
                  return <PathPoint key={key} x={values[0]} y={values[1]} />;
                case 'C':
                  return (
                    <React.Fragment key={key}>
                      {Array.from({ length: values.length / 2 }).map(
                        (_, index) => {
                          const [x1, y1] = point;
                          const [x2, y2] = [
                            values[index * 2],
                            values[index * 2 + 1],
                          ];
                          point = [x2, y2];
                          return (
                            <React.Fragment key={index}>
                              {index % 2 === 1 && (
                                <line x1={x1} y1={y1} x2={x2} y2={y2} />
                              )}
                              <PathPoint x={x2} y={y2} />
                            </React.Fragment>
                          );
                        }
                      )}
                    </React.Fragment>
                  );
                default:
                  return null;
              }
            })}
          </Box>
        )}
        <ShapeFrameBox
          id={id}
          onChange={useAutoCallback((box) => {
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: {
                d: commands
                  .map(
                    ([command, ...values]) =>
                      `${command}${values
                        .map((v, index) => {
                          const [anchor, delta, scale] =
                            /h|[^v]/i.test(command) && index % 2 === 0
                              ? [box.x, box.x - x, box.width / width]
                              : /v|[^h]/i.test(command) && index % 2 === 1
                              ? [box.y, box.y - y, box.height / height]
                              : [0, 1];
                          return (v + delta - anchor) * scale + anchor;
                        })
                        .join(',')}`
                  )
                  .join(''),
              },
            });
          })}
          x={x}
          y={y}
          width={width}
          height={height}
        />
      </Shape>
    </>
  );
});

export default PathFrame;

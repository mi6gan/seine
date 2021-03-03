// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';

import { Frame } from '../ui';
import { useSelectedLayoutItems } from '../layouts';
import { useBlocksDispatch } from '../blocks';

import { Chart } from '@seine/content';
import type { BlockEditor, ChartBody, ChartFormat } from '@seine/core';
import { UPDATE_BLOCK_EDITOR } from '@seine/core';

export type Props = ChartBody &
  $Shape<ChartFormat> &
  BlockEditor & {
    editor: { selection: number },
  };

// eslint-disable-next-line
const SelectionFrame = React.forwardRef(function SelectionFrame(
  { children, data, ...frame },
  ref
) {
  const selectionRef = React.useRef([]);
  const { current: selection } = selectionRef;

  const dispatch = useBlocksDispatch();

  const select = useAutoCallback((selection) => {
    if (selectionRef.current !== selection) {
      const isPie = frame['data-type'] === 'pie';
      if (selection.length > 0) {
        for (const target of selection) {
          dispatch({
            type: UPDATE_BLOCK_EDITOR,
            editor: {
              columnIndex: isPie ? target.order : target.point,
              rowIndex: isPie ? target.point : target.order,
            },
          });
        }
      } else {
        dispatch({
          type: UPDATE_BLOCK_EDITOR,
          editor: {
            columnIndex: null,
            rowIndex: null,
          },
        });
      }
      selectionRef.current = selection;
    }
  });

  useAutoEffect(() => {
    select(selection);
  });

  return (
    <Frame {...frame} data={data} ref={ref}>
      {children}
      <EventTracker
        onClick={useAutoCallback(({ targets }) => {
          select(targets);
        })}
      />
      <SelectionState selection={selection} />
    </Frame>
  );
});

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
const ChartEditor = React.forwardRef(function ChartEditor(props: Props, ref) {
  const { item } = useSelectedLayoutItems();
  const { id } = props;
  const isSelected = !!(item && item.id === id);
  const dispatch = useBlocksDispatch();

  useAutoEffect(() => {
    if (!isSelected) {
      dispatch({
        id,
        type: UPDATE_BLOCK_EDITOR,
        editor: {
          rowIndex: null,
          columnIndex: null,
        },
      });
    }
  });

  return (
    <Chart {...props} as={isSelected ? SelectionFrame : Frame} ref={ref} />
  );
});

export default ChartEditor;

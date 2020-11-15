// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';

import { Frame } from '../ui';

import useChartDispatchElements from './useChartDispatchElements';
import type { ChartEditorProps as Props } from './types';

import { BarChart, ColumnChart, PieChart, LineChart } from '@seine/content';
import {
  chartTypes,
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
} from '@seine/core';

// eslint-disable-next-line
const SelectionFrame = React.forwardRef(function SelectionFrame(
  { children, data, ...frame },
  ref
) {
  const selectionRef = React.useRef([]);
  const { current: selection } = selectionRef;

  const dispatchElements = useChartDispatchElements();

  const isGrouped = data.length > 1 && 'group' in data[0];

  const size = useAutoMemo(() => {
    const valueFieldsSet = new Set();
    data.forEach(({ group, ...values }) => {
      Object.keys(values).forEach((valueField) => {
        valueFieldsSet.add(valueField);
      });
    });
    return valueFieldsSet.size;
  });

  const select = useAutoCallback((selection) => {
    for (const target of selection) {
      dispatchElements({
        type: SELECT_BLOCK_ELEMENT,
        index: isGrouped
          ? size * target.point + target.order
          : target.series === 'slices'
          ? target.point
          : target.order,
      });
    }
    selectionRef.current = selection;
  });

  useAutoEffect(() => {
    select(selection);
  });

  return (
    <Frame {...frame} data={data} ref={ref}>
      {children}
      <EventTracker
        onClick={useAutoCallback(({ targets }) => {
          for (const target of selection) {
            dispatchElements({
              type: DESELECT_BLOCK_ELEMENT,
              index: isGrouped
                ? size * target.point + target.order
                : target.point,
            });
          }
          select(targets);
        })}
      />
      <SelectionState
        selection={useAutoMemo(
          isGrouped && selection.length === 1
            ? data.map((_, point) => ({
                ...selection[0],
                point,
              }))
            : selection
        )}
      />
    </Frame>
  );
});

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
const ChartEditor = React.forwardRef(function ChartEditor(
  { kind, ...chartProps }: Props,
  ref
) {
  return kind === chartTypes.PIE ? (
    <PieChart {...chartProps} as={SelectionFrame} ref={ref} />
  ) : kind === chartTypes.COLUMN ? (
    <ColumnChart {...chartProps} as={SelectionFrame} ref={ref} />
  ) : kind === chartTypes.BAR ? (
    <BarChart {...chartProps} as={SelectionFrame} ref={ref} />
  ) : (
    <LineChart {...chartProps} as={SelectionFrame} ref={ref} />
  );
});

export default ChartEditor;

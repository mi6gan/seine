// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';

import { Frame } from '../ui';
import { useSelectedLayoutItems } from '../layouts';

import PieChartElementTitleInput from './PieChartElementTitleInput';
import PieChartElementValueInput from './PieChartElementValueInput';
import ChartGroupElementValueInput from './ChartGroupElementValueInput';
import ChartGroupTitleInput from './ChartGroupTitleInput';
import LineChartElementPath from './LineChartElementPath';
import useChartDispatchElements from './useChartDispatchElements';
import type { ChartEditorProps as Props } from './types';
import ChartLegendEditor from './ChartLegendEditor';

import { useResizeTargetRef } from '@seine/styles';
import {
  ChartSvg,
  ChartSvgDefs,
  BarChart,
  ColumnChart,
  LineChartContent,
  PieChart,
  titleIdentityElements,
  useChartFormat,
} from '@seine/content';
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

  const dispatchElements = useChartDispatchElements(
    useAutoCallback(({ blocks }) =>
      blocks.filter((block) => block.id === frame.id)
    )
  );

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
        index: isGrouped ? size * target.point + target.order : target.point,
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
const ChartEditor = React.forwardRef(function ChartEditor(props: Props, ref) {
  const { kind, ...chart } = useChartFormat(props);
  const { item } = useSelectedLayoutItems();
  const resizeTargetRef = useResizeTargetRef();

  const selectedBlock = item && item.id === chart.id ? item : null;

  return kind === chartTypes.PIE ? (
    <PieChart
      {...chart}
      {...(selectedBlock && {
        elementTitleAs: PieChartElementTitleInput,
        elementValueAs: PieChartElementValueInput,
      })}
      ref={ref}
      as={SelectionFrame}
    />
  ) : kind === chartTypes.COLUMN ? (
    <ColumnChart
      {...chart}
      {...(selectedBlock && {
        elementValueAs: ChartGroupElementValueInput,
        groupTitleAs: ChartGroupTitleInput,
      })}
      ref={ref}
      as={SelectionFrame}
    />
  ) : kind === chartTypes.BAR ? (
    <BarChart
      {...chart}
      {...(selectedBlock && {
        elementValueAs: ChartGroupElementValueInput,
        groupTitleAs: ChartGroupTitleInput,
      })}
      ref={ref}
      as={SelectionFrame}
    />
  ) : (
    <Frame {...chart} ref={ref}>
      <ChartSvg {...chart} ref={resizeTargetRef}>
        <ChartSvgDefs />
        {kind === chartTypes.LINE ? (
          <LineChartContent
            {...chart}
            {...(selectedBlock && {
              elementPathAs: LineChartElementPath,
              elementValueAs: ChartGroupElementValueInput,
              groupTitleAs: ChartGroupTitleInput,
            })}
          />
        ) : null}
      </ChartSvg>
      {!!chart.legend && (
        <ChartLegendEditor
          elements={titleIdentityElements(chart.elements)}
          palette={chart.palette}
        />
      )}
    </Frame>
  );
});

export default ChartEditor;

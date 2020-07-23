// @flow
import * as React from 'react';
import {
  chartTypes,
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
} from '@seine/core';
import {
  PieChart,
  BarChartContent,
  ChartSvg,
  ChartSvgDefs,
  ColumnChartContent,
  LineChartContent,
  useChartFormat,
} from '@seine/content';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';
import { useResizeTargetRef } from '@seine/styles';

import Frame from '../ui/Frame';
import { useSelectedLayoutItems } from '../store';

import PieChartElementTitleInput from './PieChartElementTitleInput';
import PieChartElementValueInput from './PieChartElementValueInput';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import ChartGroupElementValueInput from './ChartGroupElementValueInput';
import ChartGroupTitleInput from './ChartGroupTitleInput';
import GroupedChartElementRect from './GroupedChartElementRect';
import LineChartElementPath from './LineChartElementPath';
import useChartDispatchElements from './useChartDispatchElements';
import type { ChartEditorProps as Props } from './types';

// eslint-disable-next-line
function SelectionFrame({ children, ...frame }) {
  const selectionRef = React.useRef([]);
  const { current: selection } = selectionRef;

  const dispatchElements = useChartDispatchElements(
    useAutoCallback(({ blocks }) =>
      blocks.filter((block) => block.id === frame.id)
    )
  );

  const select = useAutoCallback((selection) => {
    for (const target of selection) {
      dispatchElements({
        type: SELECT_BLOCK_ELEMENT,
        index: target.point,
      });
    }
    selectionRef.current = selection;
  });

  useAutoEffect(() => {
    select(selection);
  });

  return (
    <Frame {...frame}>
      {children}
      <EventTracker
        onClick={useAutoCallback(({ targets }) => {
          for (const target of selection) {
            dispatchElements({
              type: DESELECT_BLOCK_ELEMENT,
              index: target.point,
            });
          }
          select(targets);
        })}
      />
      <SelectionState selection={selection} />
    </Frame>
  );
}

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor(props: Props) {
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
      as={SelectionFrame}
    />
  ) : (
    <Frame {...chart}>
      <ChartSvg {...chart} ref={resizeTargetRef}>
        <ChartSvgDefs />
        {kind === chartTypes.BAR ? (
          <BarChartContent
            {...chart}
            {...(selectedBlock && {
              elementRectAs: GroupedChartElementRect,
              elementTitleAs: BarChartElementTitleInput,
              elementValueAs: ChartGroupElementValueInput,
              groupTitleAs: ChartGroupTitleInput,
            })}
          />
        ) : kind === chartTypes.COLUMN ? (
          <ColumnChartContent
            {...chart}
            {...(selectedBlock && {
              elementRectAs: GroupedChartElementRect,
              elementValueAs: ChartGroupElementValueInput,
              groupTitleAs: ChartGroupTitleInput,
            })}
          />
        ) : kind === chartTypes.LINE ? (
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
    </Frame>
  );
}

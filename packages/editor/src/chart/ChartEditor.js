// @flow
import * as React from 'react';
import {
  chartTypes,
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
} from '@seine/core';
import {
  BarChartContent,
  ChartSvg,
  ChartSvgDefs,
  ColumnChartContent,
  LineChartContent,
  PieChartContent,
  useChartFormat,
} from '@seine/content';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';
import { Chart } from '@devexpress/dx-react-chart-material-ui';

import Frame from '../ui/Frame';
import { useSelectedLayoutItems } from '../store';

import type { ChartEditorProps as Props } from './types';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import GroupedChartElementRect from './GroupedChartElementRect';
import ChartGroupElementValueInput from './ChartGroupElementValueInput';
import ChartGroupTitleInput from './ChartGroupTitleInput';
import LineChartElementPath from './LineChartElementPath';
import useDispatchElements from './useDispatchElements';
import { defaultChartEditor } from './constants';
import useChartBlock from './useChartBlock';

// eslint-disable-next-line
function SelectableChart({ children, ...props }) {
  const dispatchElements = useDispatchElements();
  const targetRef = React.useRef(null);
  const { current: target } = targetRef;
  const {
    editor: { selection },
  } = useChartBlock();
  const hasSelection = selection > -1;

  return (
    <Chart {...props}>
      {children}
      <EventTracker
        onClick={useAutoCallback(({ targets: [target = null] }) => {
          if (target === null && targetRef.current) {
            dispatchElements({
              type: DESELECT_BLOCK_ELEMENT,
              index: targetRef.current.point,
            });
          }
          targetRef.current = target;
          if (target) {
            dispatchElements({
              type: SELECT_BLOCK_ELEMENT,
              index: target.point,
            });
          }
        })}
      />
      <SelectionState
        selection={useAutoMemo(hasSelection && target ? [target] : [])}
      />
    </Chart>
  );
}

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  children,
  editor = defaultChartEditor,
  kind = chartTypes.BAR,
  ...chartProps
}: Props) {
  chartProps = useChartFormat({ kind, ...chartProps });
  const { id } = chartProps;
  const { item } = useSelectedLayoutItems();
  const selectedBlock = item && item.id === id ? item : null;

  const resizeTargetRef = useResizeTargetRef();

  return (
    <Frame id={id} selected={!!selectedBlock} {...chartProps}>
      {kind === chartTypes.PIE ? (
        <PieChartContent
          {...chartProps}
          {...(selectedBlock && { as: SelectableChart })}
        />
      ) : (
        <ChartSvg {...chartProps} ref={resizeTargetRef}>
          <ChartSvgDefs />
          {kind === chartTypes.BAR ? (
            <BarChartContent
              {...chartProps}
              {...(selectedBlock && {
                elementRectAs: GroupedChartElementRect,
                elementTitleAs: BarChartElementTitleInput,
                elementValueAs: ChartGroupElementValueInput,
                groupTitleAs: ChartGroupTitleInput,
              })}
            />
          ) : kind === chartTypes.COLUMN ? (
            <ColumnChartContent
              {...chartProps}
              {...(selectedBlock && {
                elementRectAs: GroupedChartElementRect,
                elementValueAs: ChartGroupElementValueInput,
                groupTitleAs: ChartGroupTitleInput,
              })}
            />
          ) : kind === chartTypes.LINE ? (
            <LineChartContent
              {...chartProps}
              {...(selectedBlock && {
                elementPathAs: LineChartElementPath,
                elementValueAs: ChartGroupElementValueInput,
                groupTitleAs: ChartGroupTitleInput,
              })}
            />
          ) : null}
        </ChartSvg>
      )}
    </Frame>
  );
}

// @flow
import * as React from 'react';
import {
  chartTypes,
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_FORMAT,
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
import { useAutoCallback } from 'hooks.macro';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';
import { Chart } from '@devexpress/dx-react-chart-material-ui';

import Frame from '../ui/Frame';
import { useEditorDispatch, useSelectedLayoutItems } from '../store';

import type { ChartEditorProps as Props } from './types';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import PieChartElementPath from './PieChartElementPath';
import PieChartElementTitleInput from './PieChartElementTitleInput';
import PieChartElementValueInput from './PieChartElementValueInput';
import GroupedChartElementRect from './GroupedChartElementRect';
import ChartGroupElementValueInput from './ChartGroupElementValueInput';
import ChartGroupTitleInput from './ChartGroupTitleInput';
import LineChartElementPath from './LineChartElementPath';
import useDispatchElements from './useDispatchElements';
import { defaultChartEditor } from './constants';
import useChartBlock from './useChartBlock';

// eslint-disable-next-line
function SelectableChart({ children, ...props }) {
  const {
    editor: { selection },
  } = useChartBlock();
  const dispatchElements = useDispatchElements();
  const targetRef = React.useRef();

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
        selection={
          selection > -1 && targetRef.current ? [targetRef.current] : []
        }
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
  const dispatch = useEditorDispatch();
  const { item } = useSelectedLayoutItems();
  const selectedBlock = item && item.id === id ? item : null;

  const dispatchElements = useDispatchElements();
  const handleAutoFormat = useAutoCallback((format) =>
    dispatch({
      type: UPDATE_BLOCK_FORMAT,
      format,
    })
  );

  const metaProps = { editor, dispatch, dispatchElements };
  const resizeTargetRef = useResizeTargetRef();

  return (
    <Frame id={id} selected={!!selectedBlock} {...chartProps}>
      {kind === chartTypes.PIE ? (
        <PieChartContent
          {...metaProps}
          {...chartProps}
          {...(selectedBlock && {
            elementPathAs: PieChartElementPath,
            elementValueAs: PieChartElementValueInput,
            groupTitleAs: PieChartElementTitleInput,
            as: SelectableChart,
          })}
          onAutoFormat={handleAutoFormat}
        />
      ) : (
        <ChartSvg {...chartProps} ref={resizeTargetRef}>
          <ChartSvgDefs />
          {kind === chartTypes.BAR ? (
            <BarChartContent
              {...metaProps}
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
              {...metaProps}
              {...chartProps}
              {...(selectedBlock && {
                elementRectAs: GroupedChartElementRect,
                elementValueAs: ChartGroupElementValueInput,
                groupTitleAs: ChartGroupTitleInput,
              })}
            />
          ) : kind === chartTypes.LINE ? (
            <LineChartContent
              {...metaProps}
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

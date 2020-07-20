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
import useChartBlock from './useChartBlock';
import PieChartElementTitleInput from './PieChartElementTitleInput';
import PieChartElementValueInput from './PieChartElementValueInput';

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
    <Frame {...props} as={Chart}>
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
    </Frame>
  );
}

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  kind = chartTypes.BAR,
  ...initialChartProps
}: Props) {
  const chartProps = useChartFormat({ kind, ...initialChartProps });
  const { id } = chartProps;
  const { item } = useSelectedLayoutItems();
  const selectedBlock = item && item.id === id ? item : null;

  return kind === chartTypes.PIE ? (
    <PieChartContent
      {...chartProps}
      as={selectedBlock ? SelectableChart : Frame}
      {...(selectedBlock && {
        elementTitleAs: PieChartElementTitleInput,
        elementValueAs: PieChartElementValueInput,
      })}
    />
  ) : (
    <Frame {...chartProps}>
      <ChartSvg {...chartProps}>
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
    </Frame>
  );
}

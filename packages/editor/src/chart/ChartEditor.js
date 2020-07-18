// @flow
import * as React from 'react';
import { chartTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import {
  BarChartContent,
  ChartSvg,
  ChartSvgDefs,
  ColumnChartContent,
  LineChartContent,
  PieChartContent,
  useChartFormatDefaults,
} from '@seine/content';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';

import Frame from '../ui/Frame';
import { useEditorDispatch, useSelectedBlocks } from '../store';

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
  chartProps = useChartFormatDefaults(kind, chartProps);
  const { id } = chartProps;
  const dispatch = useEditorDispatch();
  const selectedBlock = useSelectedBlocks().find((block) => block.id === id);

  const dispatchElements = useDispatchElements();

  const handleAutoFormat = useAutoCallback((format) =>
    dispatch({
      type: UPDATE_BLOCK_FORMAT,
      format,
    })
  );

  const metaProps = { editor, dispatch, dispatchElements };

  return (
    <Frame id={id} selected={!!selectedBlock} {...chartProps}>
      <ChartSvg {...chartProps} ref={useResizeTargetRef()}>
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
        ) : kind === chartTypes.PIE ? (
          <PieChartContent
            {...metaProps}
            {...chartProps}
            {...(selectedBlock && {
              elementPathAs: PieChartElementPath,
              elementValueAs: PieChartElementValueInput,
              groupTitleAs: PieChartElementTitleInput,
            })}
            onAutoFormat={handleAutoFormat}
          />
        ) : null}
      </ChartSvg>
    </Frame>
  );
}
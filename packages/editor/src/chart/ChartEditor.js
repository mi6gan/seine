// @flow
import * as React from 'react';
import {
  chartTypes,
  initialElementsState,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import { InlineInput } from '@seine/ui';
import {
  BarChartContent,
  Chart,
  ChartLayout,
  ChartSvg,
  ChartSvgDefs,
  ColumnChartContent,
  LineChartContent,
  PieChartContent,
  useChartFormatDefaults,
  useChartSvgProps,
} from '@seine/content';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';

import Frame from '../ui/Frame';
import { useEditorDispatch, useSelectedBlocks } from '../store';

import type { ChartEditorProps as Props } from './types';
import ChartGroupsDescriptionEditor from './ChartGroupsDescriptionEditor';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import PieChartElementPath from './PieChartElementPath';
import PieChartElementTitleInput from './PieChartElementTitleInput';
import PieChartElementValueInput from './PieChartElementValueInput';
import GroupedChartElementRect from './GroupedChartElementRect';
import ChartGroupElementValueInput from './ChartGroupElementValueInput';
import ChartGroupTitleInput from './ChartGroupTitleInput';
import ChartDescriptionEditor from './ChartDescriptionEditor';
import LineChartElementPath from './LineChartElementPath';
import useDispatchElements from './useDispatchElements';

const defaultEditor = {
  selection: initialElementsState.selection,
};

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  children,
  kind = chartTypes.BAR,
  ...chartProps
}: Props) {
  chartProps = useChartFormatDefaults(kind, chartProps);
  const dispatch = useEditorDispatch();
  const selectedBlock = useSelectedBlocks().find(
    ({ id }) => id === chartProps.id
  );

  const editor = selectedBlock && (selectedBlock.editor || defaultEditor);

  const dispatchElements = useDispatchElements();

  const resizeTargetRef = useResizeTargetRef();

  const handleTitleChange = useAutoCallback(({ currentTarget }) =>
    dispatch({
      type: UPDATE_BLOCK_BODY,
      body: { title: currentTarget.value },
    })
  );

  const handleAutoFormat = useAutoCallback((format) =>
    dispatch({
      type: UPDATE_BLOCK_FORMAT,
      format,
    })
  );

  const metaProps = { editor, dispatch, dispatchElements };

  const svgProps = useChartSvgProps(kind, chartProps);
  const { id } = chartProps;

  return (
    <Frame
      selected={!!selectedBlock}
      id={id}
      ref={resizeTargetRef}
      as={selectedBlock ? ChartLayout : Chart}
      {...chartProps}
      {...(!!selectedBlock && {
        title: (
          <InlineInput
            onChange={handleTitleChange}
            textAlignment={chartProps.textAlignment}
            value={chartProps.title}
          />
        ),
        description:
          kind === chartTypes.PIE ? (
            <ChartDescriptionEditor
              {...chartProps}
              dispatchElements={dispatchElements}
            />
          ) : (
            <ChartGroupsDescriptionEditor
              {...chartProps}
              dispatchElements={dispatchElements}
            />
          ),
        textAlignment: chartProps.textAlignment,
        overflow: kind === chartTypes.PIE ? 'hidden' : 'visible',
        height: chartProps.height,
      })}
    >
      {selectedBlock ? (
        <ChartSvg {...svgProps}>
          <ChartSvgDefs />
          {kind === chartTypes.BAR ? (
            <BarChartContent
              {...chartProps}
              {...metaProps}
              elementRectAs={GroupedChartElementRect}
              elementTitleAs={BarChartElementTitleInput}
              elementValueAs={ChartGroupElementValueInput}
              groupTitleAs={ChartGroupTitleInput}
            />
          ) : kind === chartTypes.COLUMN ? (
            <ColumnChartContent
              {...chartProps}
              {...metaProps}
              elementRectAs={GroupedChartElementRect}
              elementValueAs={ChartGroupElementValueInput}
              groupTitleAs={ChartGroupTitleInput}
            />
          ) : kind === chartTypes.LINE ? (
            <LineChartContent
              {...chartProps}
              {...metaProps}
              elementPathAs={LineChartElementPath}
              elementValueAs={ChartGroupElementValueInput}
              groupTitleAs={ChartGroupTitleInput}
            />
          ) : kind === chartTypes.PIE ? (
            <PieChartContent
              {...chartProps}
              {...metaProps}
              elementPathAs={PieChartElementPath}
              elementTitleAs={PieChartElementTitleInput}
              elementValueAs={PieChartElementValueInput}
              onAutoFormat={handleAutoFormat}
            />
          ) : null}
        </ChartSvg>
      ) : null}
    </Frame>
  );
}

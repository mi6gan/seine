// @flow
import * as React from 'react';
import {
  chartTypes,
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

  const handleTitleChange = useAutoCallback(({ currentTarget }) =>
    dispatch({
      id,
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

  return (
    <Frame
      id={id}
      selected={!!selectedBlock}
      ref={useResizeTargetRef()}
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
              {...metaProps}
              {...chartProps}
              dispatchElements={dispatchElements}
            />
          ) : (
            <ChartGroupsDescriptionEditor
              {...metaProps}
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
              {...metaProps}
              {...chartProps}
              elementRectAs={GroupedChartElementRect}
              elementTitleAs={BarChartElementTitleInput}
              elementValueAs={ChartGroupElementValueInput}
              groupTitleAs={ChartGroupTitleInput}
            />
          ) : kind === chartTypes.COLUMN ? (
            <ColumnChartContent
              {...metaProps}
              {...chartProps}
              elementRectAs={GroupedChartElementRect}
              elementValueAs={ChartGroupElementValueInput}
              groupTitleAs={ChartGroupTitleInput}
            />
          ) : kind === chartTypes.LINE ? (
            <LineChartContent
              {...metaProps}
              {...chartProps}
              elementPathAs={LineChartElementPath}
              elementValueAs={ChartGroupElementValueInput}
              groupTitleAs={ChartGroupTitleInput}
            />
          ) : kind === chartTypes.PIE ? (
            <PieChartContent
              {...metaProps}
              {...chartProps}
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

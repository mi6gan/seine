// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
} from '../ui';
import { useBlocksDispatch } from '../blocks';

import ChartPaletteSelect from './ChartPaletteSelect';
import ChartStructureGroup from './ChartStructureGroup';
import ChartElementColorButton from './ChartElementColorButton';
import useChartBlock from './useChartBlock';
import useElementSelector from './useElementSelector';
import useChartDispatchElements from './useChartDispatchElements';

import { Checkbox } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';
import {
  chartTypes,
  UPDATE_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT_BY_GROUP,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    id,
    format: { kind, units, fraction, legend, xAxis, yAxis },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  const dispatchElements = useChartDispatchElements();
  const formatInput = useAutoCallback(
    ({ currentTarget: { value, name, type } }) => {
      dispatch({
        id,
        type: UPDATE_BLOCK_FORMAT,
        format: { [name]: type === 'number' ? +value : value },
      });
    }
  );
  const { element, selection } = useElementSelector();
  const group = `${(element && element.group) || null}`;
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <SidebarGroup>
          <SidebarLabel>units</SidebarLabel>
          <SidebarInput
            disabled={!id}
            value={units}
            name={'units'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>fraction</SidebarLabel>
          <SidebarInput
            disabled={!id}
            value={fraction}
            name={'fraction'}
            type={'number'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <ChartPaletteSelect />

        <SidebarGroup>
          <SidebarLabel>legend</SidebarLabel>
          <Checkbox
            checked={!!legend}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { legend: !legend },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(kind !== chartTypes.BAR && { display: 'none' })}>
          <SidebarLabel>x axis</SidebarLabel>
          <Checkbox
            checked={!!xAxis}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { xAxis: !xAxis },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(kind === chartTypes.BAR && { display: 'none' })}>
          <SidebarLabel>y axis</SidebarLabel>
          <Checkbox
            checked={!!yAxis}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { yAxis: !yAxis },
              });
            })}
          />
        </SidebarGroup>
      </SidebarSection>

      <SidebarSection>
        <Box
          as={SidebarHeading}
          display={'flex'}
          justifyContent={'space-between'}
        >
          Element
          <ChartStructureGroup />
        </Box>
        <ChartElementColorButton />
        <SidebarGroup {...(element === null && { display: 'none' })}>
          <SidebarLabel>value</SidebarLabel>
          <SidebarInput
            type={'number'}
            value={element && element.value}
            onChange={useAutoCallback((event) => {
              dispatchElements({
                index: selection,
                type: UPDATE_BLOCK_ELEMENT,
                body: { value: +event.currentTarget.value },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(element === null && { display: 'none' })}>
          <SidebarLabel>title</SidebarLabel>
          <SidebarInput
            multiline
            width={'100%'}
            value={element && element.title}
            onChange={useAutoCallback((event) => {
              dispatchElements({
                index: selection,
                type: UPDATE_BLOCK_ELEMENT,
                body: { title: event.currentTarget.value },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(group === 'null' && { display: 'none' })}>
          <SidebarLabel>group</SidebarLabel>
          <SidebarInput
            value={group}
            onChange={useAutoCallback((event) => {
              dispatchElements({
                type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
                group: element.group,
                body: { group: event.currentTarget.value },
              });
            })}
          />
        </SidebarGroup>
      </SidebarSection>
    </>
  );
}

// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
  SidebarSelect,
} from '../ui';
import { EditorActionButton, useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import ChartPaletteSelect from './ChartPaletteSelect';
import ChartStructureGroup from './ChartStructureGroup';
import ChartElementColorButton from './ChartElementColorButton';
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

type Props = {
  buttonAs?: React.ComponentType,
  colorButtonAs?: React.ComponentType,
  selectAs?: React.ComponentType,
  inputAs?: React.ComponentType,
};

/**
 * @description Chart design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartDesign({
  buttonAs: Button = EditorActionButton,
  colorButtonAs: ColorButton = ChartElementColorButton,
  selectAs: Select = SidebarSelect,
  inputAs: Input = SidebarInput,
}: Props) {
  const {
    item: {
      id,
      format: { kind, units, fraction, legend, xAxis, yAxis },
    },
  } = useSelectedLayoutItems();
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
          <Input
            disabled={!id}
            value={units}
            name={'units'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>fraction</SidebarLabel>
          <Input
            disabled={!id}
            value={fraction}
            name={'fraction'}
            type={'number'}
            onChange={formatInput}
          />
        </SidebarGroup>

        <ChartPaletteSelect selectAs={Select} />

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
          <ChartStructureGroup buttonAs={Button} />
        </Box>
        {ColorButton && <ColorButton />}
        <SidebarGroup {...(element === null && { display: 'none' })}>
          <SidebarLabel>value</SidebarLabel>
          <Input
            type={'number'}
            name={'value'}
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
          <Input
            multiline
            width={'100%'}
            name={'title'}
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
          <Input
            value={group}
            name={'group'}
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

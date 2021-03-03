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

import { Checkbox } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';
import {
  chartTypes,
  UPDATE_BLOCK_BODY,
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
      body: { rows, titles, header },
      format: { kind, units, fraction, legend, xAxis, yAxis },
      editor: { rowIndex = null, columnIndex = null } = {},
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const formatInput = useAutoCallback(
    ({ currentTarget: { value, name, type } }) => {
      dispatch({
        id,
        type: UPDATE_BLOCK_FORMAT,
        format: { [name]: type === 'number' ? +value : value },
      });
    }
  );
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
        {ColorButton && rowIndex !== null && columnIndex !== null && (
          <ColorButton />
        )}
        <SidebarGroup
          {...((rowIndex === null || columnIndex === null) && {
            display: 'none',
          })}
        >
          <SidebarLabel>value</SidebarLabel>
          <Input
            type={'number'}
            name={'value'}
            value={
              rows[rowIndex] && rows[rowIndex][columnIndex]
                ? rows[rowIndex][columnIndex].value
                : ''
            }
            onChange={useAutoCallback((event) => {
              dispatch({
                id,
                type: UPDATE_BLOCK_BODY,
                body: {
                  rows: [
                    ...rows.slice(0, rowIndex),
                    [
                      ...rows[rowIndex].slice(0, columnIndex),
                      {
                        ...rows[rowIndex][columnIndex],
                        value: +event.currentTarget.value,
                      },
                      ...rows[rowIndex].slice(columnIndex + 1),
                    ],
                    ...rows.slice(rowIndex + 1),
                  ],
                },
              });
            })}
          />
        </SidebarGroup>

        <SidebarGroup {...(rowIndex === null && { display: 'none' })}>
          <SidebarLabel>title</SidebarLabel>
          <Input
            multiline
            width={'100%'}
            name={'title'}
            value={titles[rowIndex]}
            onChange={useAutoCallback((event) => {
              dispatch({
                id,
                type: UPDATE_BLOCK_BODY,
                body: {
                  titles: [
                    ...titles.slice(0, rowIndex),
                    event.currentTarget.value,
                    ...titles.slice(rowIndex + 1),
                  ],
                  rows: [
                    ...rows.slice(0, rowIndex),
                    rows[rowIndex].map((item) => ({
                      ...item,
                      text: event.currentTarget.value,
                    })),
                    ...rows.slice(rowIndex + 1),
                  ],
                },
              });
            })}
          />
        </SidebarGroup>
        <SidebarGroup
          {...((kind === chartTypes.PIE || columnIndex === null) && {
            display: 'none',
          })}
        >
          <SidebarLabel>group</SidebarLabel>
          <Input
            value={header[columnIndex] && header[columnIndex].text}
            name={'group'}
            onChange={useAutoCallback((event) => {
              dispatch({
                id,
                type: UPDATE_BLOCK_BODY,
                body: {
                  header: [
                    ...header.slice(0, columnIndex),
                    { ...header[columnIndex], text: event.currentTarget.value },
                    ...header.slice(columnIndex + 1),
                  ],
                },
              });
            })}
          />
        </SidebarGroup>
      </SidebarSection>
    </>
  );
}

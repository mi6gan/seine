// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro';
import styled from 'styled-components/macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
  SidebarSelect,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { useBlocksDispatch } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';

import {
  BorderBottom as PositionBottom,
  BorderInner as PositionCenter,
  BorderLeft as PositionLeft,
  BorderRight as PositionRight,
  BorderStyle as PositionLeftTop,
  BorderTop as PositionTop,
} from '@seine/styles/mui-icons.macro';
import { Box } from '@seine/styles';
import type { ItemFormat } from '@seine/core';
import { getDefaultBlockFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';

const PositionRightTop = styled(PositionLeftTop)`
  transform: scaleX(-1);
`;

const PositionLeftBottom = styled(PositionLeftTop)`
  transform: scaleY(-1);
`;

const PositionRightBottom = styled(PositionLeftTop)`
  transform: scale(-1);
`;

const PositionToggleButton = styled(
  React.forwardRef((props, ref) => <ToolbarToggleButton {...props} ref={ref} />)
)`
  &&& {
    border: none;
    padding: 0;
    ${({ value }) =>
      value.startsWith('center')
        ? { borderRadius: 0 }
        : value.startsWith('flex-end')
        ? {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }
        : {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
`;

const SIZE_UNITS = ['%', 'px', 'rem'];

type Props = {
  defaults: ItemFormat,
  inputAs?: React.ComponentType,
  selectAs?: React.ComponentType,
};

// eslint-disable-next-line
function getUnits(min, max) {
  const value =
    min && min !== 'none' ? min : max && max !== 'none' ? max : null;
  if (value) {
    return `${value}`.split(`${parseFloat(value)}`)[1];
  }
  return '';
}

const ItemDesign = React.forwardRef(function ItemDesign(
  {
    inputAs: Input = SidebarInput,
    selectAs: Select = SidebarSelect,
    ...sectionProps
  }: Props,
  ref
) {
  const {
    item: {
      id,
      type,
      format: {
        kind,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        alignSelf,
        justifySelf,
      },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const defaults = useAutoMemo(getDefaultBlockFormat(type, kind));
  const togglePosition = useAutoCallback((event, value) => {
    const [justify = defaults.justifySelf, align = defaults.alignSelf] = value
      ? value.split(' ')
      : [];
    dispatch({
      id,
      type: UPDATE_BLOCK_FORMAT,
      format: {
        justifySelf: justify,
        alignSelf: align,
      },
    });
  });
  const position = `${justifySelf} ${alignSelf}`;

  const initialWidthUnits = useAutoMemo(getUnits(minWidth, maxWidth));
  const initialHeightUnits = useAutoMemo(getUnits(minHeight, maxHeight));

  const [widthUnits, setWidthUnits] = React.useState(initialWidthUnits);
  const [heightUnits, setHeightUnits] = React.useState(initialHeightUnits);

  useAutoEffect(() => {
    if (initialWidthUnits !== '') {
      setWidthUnits(initialWidthUnits);
    }
  });

  useAutoEffect(() => {
    if (initialHeightUnits !== '') {
      setHeightUnits(initialHeightUnits);
    }
  });

  return (
    <SidebarSection {...sectionProps} as={'form'} ref={ref}>
      <SidebarHeading>Constraints</SidebarHeading>

      <SidebarGroup alignItems={'baseline'} mb={0}>
        <SidebarLabel>width</SidebarLabel>
        <Input
          inputProps={{ placeholder: 'min' }}
          disabled={!id}
          value={parseInt(minWidth) || ''}
          name={'minWidth'}
          onChange={useAutoCallback((event) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: {
                [event.currentTarget.name]: `${event.currentTarget.value ||
                  0}${widthUnits || '%'}`,
              },
            });
          })}
        />
        <Input
          inputProps={{ placeholder: 'max' }}
          disabled={!id}
          value={parseInt(maxWidth) || ''}
          name={'maxWidth'}
          onChange={useAutoCallback((event) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: {
                [event.currentTarget.name]: event.currentTarget.value
                  ? `${event.currentTarget.value}${widthUnits || '%'}`
                  : 'none',
              },
            });
          })}
        />
        <Select
          name={'widthUnits'}
          value={widthUnits}
          onChange={useAutoCallback((event) => {
            const format = {};
            const { value: units } = event.currentTarget;
            for (const key of ['minWidth', 'maxWidth']) {
              const { value } = event.currentTarget.form.elements.namedItem(
                key
              );
              format[key] = value ? `${value}${units}` : 'none';
            }
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format,
            });
          })}
          native
        >
          {SIZE_UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </Select>
      </SidebarGroup>

      <SidebarGroup alignItems={'baseline'} mt={0}>
        <SidebarLabel>height</SidebarLabel>
        <Input
          inputProps={{ placeholder: 'min' }}
          disabled={!id}
          value={parseInt(minHeight) || ''}
          name={'minHeight'}
          onChange={useAutoCallback((event) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: {
                [event.currentTarget.name]: `${event.currentTarget.value ||
                  0}${heightUnits}`,
              },
            });
          })}
        />
        <Input
          inputProps={{ placeholder: 'max' }}
          disabled={!id}
          value={parseInt(maxHeight) || ''}
          name={'maxHeight'}
          onChange={useAutoCallback((event) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: {
                [event.currentTarget.name]: event.currentTarget.value
                  ? `${event.currentTarget.value}${heightUnits}`
                  : 'none',
              },
            });
          })}
        />
        <Select
          name={'heightUnits'}
          value={heightUnits}
          onChange={useAutoCallback((event) => {
            const format = {};
            const { value: units } = event.currentTarget;
            for (const key of ['minHeight', 'maxHeight']) {
              const { value } = event.currentTarget.form.elements.namedItem(
                key
              );
              format[key] = value ? `${value}${units}` : 'none';
            }
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format,
            });
          })}
          native
        >
          {SIZE_UNITS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </Select>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarLabel>position</SidebarLabel>

        <Box display={'flex'} flexDirection={'column'} pl={1}>
          <ToolbarToggleButtonGroup
            value={position}
            onChange={togglePosition}
            mb={0}
          >
            <PositionToggleButton value={'flex-start flex-start'}>
              <PositionLeftTop />
            </PositionToggleButton>

            <PositionToggleButton value={'center flex-start'}>
              <PositionTop />
            </PositionToggleButton>

            <PositionToggleButton value={'flex-end flex-start'}>
              <PositionRightTop />
            </PositionToggleButton>
          </ToolbarToggleButtonGroup>

          <ToolbarToggleButtonGroup
            my={0}
            value={position}
            onChange={togglePosition}
          >
            <PositionToggleButton value={'flex-start center'}>
              <PositionLeft />
            </PositionToggleButton>

            <PositionToggleButton value={'center center'}>
              <PositionCenter />
            </PositionToggleButton>

            <PositionToggleButton value={'flex-end center'}>
              <PositionRight />
            </PositionToggleButton>
          </ToolbarToggleButtonGroup>

          <ToolbarToggleButtonGroup
            mt={0}
            position={'relative'}
            value={position}
            onChange={togglePosition}
          >
            <PositionToggleButton value={'flex-start flex-end'}>
              <PositionLeftBottom />
            </PositionToggleButton>

            <PositionToggleButton value={'center flex-end'}>
              <PositionBottom />
            </PositionToggleButton>

            <PositionToggleButton value={'flex-end flex-end'}>
              <PositionRightBottom />
            </PositionToggleButton>
          </ToolbarToggleButtonGroup>
        </Box>
      </SidebarGroup>
    </SidebarSection>
  );
});

export default (ItemDesign: React.ComponentType<Props>);

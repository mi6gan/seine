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

const ConstrainInput = ({
  inputAs: Input,
  selectAs: Select,
  name,
  value,
  onChange,
  ...InputProps
}) => (
  <Input
    {...InputProps}
    type={'number'}
    name={`${name}.value`}
    onChange={onChange}
    defaultValue={parseInt(value) || ''}
    width={'5.5rem'}
    mr={0}
    endAdornment={
      <Select
        native
        width={'4ch'}
        textAlign={'right'}
        fontSize={'0.75rem'}
        name={`${name}.units`}
        onChange={onChange}
        defaultValue={`${value}`.replace(/\d/g, '')}
        disableUnderline
      >
        {SIZE_UNITS.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </Select>
    }
  />
);

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
  const timeoutsRef = React.useRef({});
  const position = `${justifySelf} ${alignSelf}`;
  const changeConstraint = useAutoCallback(({ currentTarget }) => {
    const { form } = currentTarget;

    const [name, field] = currentTarget.name.split('.');

    const valueElement: HTMLInputElement = form.elements.namedItem(
      `${name}.value`
    );
    const unitsElement = form.elements.namedItem(`${name}.units`);

    const { value } = valueElement;
    const { value: units } = unitsElement;

    const submit = () => {
      dispatch({
        id,
        type: UPDATE_BLOCK_FORMAT,
        format: {
          [name]: field === 'value' && value ? `${value}${units}` : null,
        },
      });
    };

    if (field === 'units') {
      submit();
      valueElement.value = '';
      valueElement.focus();
    } else {
      const {
        current: { [name]: timeout = null, ...timeouts },
      } = timeoutsRef;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeoutsRef.current = {
        ...timeouts,
        [name]: setTimeout(submit, 250),
      };
    }
  });

  useAutoEffect(() => () => {
    Object.values(timeoutsRef.current).forEach((timeout) => {
      clearTimeout(timeout);
    });
    timeoutsRef.current = {};
  });

  return (
    <SidebarSection {...sectionProps} as={'form'} ref={ref}>
      <SidebarHeading>Constraints</SidebarHeading>

      <SidebarGroup alignItems={'baseline'} mb={0}>
        <SidebarLabel>width</SidebarLabel>
        <Box display={'flex'} mr={1}>
          <ConstrainInput
            inputAs={Input}
            inputProps={{ placeholder: 'min' }}
            selectAs={Select}
            name={'minWidth'}
            value={minWidth}
            onChange={changeConstraint}
          />
        </Box>
        <Box display={'flex'}>
          <ConstrainInput
            inputAs={Input}
            inputProps={{ placeholder: 'max' }}
            selectAs={Select}
            name={'maxWidth'}
            value={maxWidth}
            onChange={changeConstraint}
          />
        </Box>
      </SidebarGroup>

      <SidebarGroup alignItems={'baseline'} mb={0}>
        <SidebarLabel>height</SidebarLabel>
        <Box display={'flex'} mr={1}>
          <ConstrainInput
            inputAs={Input}
            inputProps={{ placeholder: 'min' }}
            selectAs={Select}
            name={'minHeight'}
            value={minHeight}
            onChange={changeConstraint}
          />
        </Box>
        <Box display={'flex'}>
          <ConstrainInput
            inputAs={Input}
            inputProps={{ placeholder: 'max' }}
            selectAs={Select}
            name={'maxHeight'}
            value={maxHeight}
            onChange={changeConstraint}
          />
        </Box>
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

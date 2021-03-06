// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { SidebarInput, SidebarSelect, useBlocksDispatch } from '@seine/editor';

const defaultUnits = ['%', 'px', 'rem'];

// eslint-disable-next-line
export default function ConstraintInput({
  id,
  inputAs: Input = SidebarInput,
  selectAs: Select = SidebarSelect,
  name,
  value,
  onChange,
  onSubmit = null,
  units = defaultUnits,
  ...InputProps
}) {
  const dispatch = useBlocksDispatch();
  const timeoutsRef = React.useRef({});
  const changeValue = useAutoCallback(({ currentTarget }) => {
    const { form } = currentTarget;

    const [name, field] = currentTarget.name.split('.');

    const valueElement: HTMLInputElement = form.elements.namedItem(
      `${name}.value`
    );
    const unitsElement = form.elements.namedItem(`${name}.units`);

    const { value } = valueElement;
    const { value: units } = unitsElement;

    const submit =
      onSubmit ||
      ((value) => {
        dispatch({
          id,
          type: UPDATE_BLOCK_FORMAT,
          format: {
            [name]: value,
          },
        });
      });

    const valueToSubmit =
      field === 'value' && value ? `${value}${units}` : null;
    if (field === 'units') {
      submit(valueToSubmit);
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
        [name]: setTimeout(() => submit(valueToSubmit), 500),
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
    <Input
      {...InputProps}
      type={'number'}
      name={`${name}.value`}
      onChange={changeValue}
      defaultValue={parseFloat(value) || ''}
      width={'5.5rem'}
      mr={0}
      endAdornment={
        <Select
          native
          width={'4ch'}
          fontSize={'0.75rem'}
          name={`${name}.units`}
          onChange={changeValue}
          defaultValue={`${value}`.replace(/\d/g, '')}
          disableUnderline
        >
          {units.map((unit) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </Select>
      }
    />
  );
}

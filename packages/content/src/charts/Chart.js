// @flow
import * as React from 'react';
import { useAutoMemo, useAutoEffect } from 'hooks.macro';

import { Item } from '../layouts';

import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import LineChart from './LineChart';

import type { ChartBody, ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';

type Props = $Shape<ChartFormat> & ChartBody;

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Chart({
  kind,
  elements,
  as: ChartItem = Item,
  ...chartProps
}: Props) {
  const data = (chartProps.data = useAutoMemo(
    kind === chartTypes.PIE
      ? elements
      : Object.entries(
          elements.reduce(
            (acc, { group = null, title, value }) => ({
              ...acc,
              [group]: { ...acc[group], [title]: value },
            }),
            {}
          )
        ).map(([group, values]) => ({ ...values, group }))
  ));

  const newValueFields = useAutoMemo(() => {
    const valueFieldsSet = new Set();
    data.forEach(({ group, ...values }) => {
      Object.keys(values).forEach((valueField) => {
        valueFieldsSet.add(valueField);
      });
    });
    return [...valueFieldsSet];
  });

  const [valueFields, setValueFields] = React.useState(newValueFields);
  const forceRemount = valueFields.length !== newValueFields.length;

  useAutoEffect(() => {
    setValueFields(newValueFields);
  });

  if (forceRemount) {
    return null;
  }

  if (kind !== chartTypes.PIE) {
    chartProps.valueFields = valueFields;
  }

  return kind === chartTypes.PIE ? (
    <PieChart {...chartProps} as={ChartItem} data-type={'pie'} />
  ) : kind === chartTypes.COLUMN ? (
    <ColumnChart {...chartProps} as={ChartItem} data-type={'column'} />
  ) : kind === chartTypes.BAR ? (
    <BarChart {...chartProps} as={ChartItem} data-type={'bar'} />
  ) : (
    <LineChart {...chartProps} as={ChartItem} data-type={'line'} />
  );
}

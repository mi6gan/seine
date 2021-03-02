// @flow
import * as React from 'react';
import { useAutoMemo, useAutoEffect, useAutoCallback } from 'hooks.macro';

import { Item } from '../layouts';

import PieChart from './PieChart';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ChartLabel from './ChartLabel';

import type { ChartBody, ChartFormat } from '@seine/core';
import { chartTypes } from '@seine/core';

type Props = $Shape<ChartFormat> & ChartBody;

/**
 * @description Switch to chart render components by its kind.
 * @param {Props} props
 * @returns {React.Node}
 */
const Chart = React.forwardRef(function Chart(
  { kind, elements, as: ChartItem = Item, ...chartProps }: Props,
  ref
) {
  const { header, rows, titles } = chartProps;
  const data = (chartProps.data = useAutoMemo(
    kind === chartTypes.PIE
      ? rows.reduce((acc, row) => [...acc, ...row], [])
      : header.map(({ value: group }) =>
          rows.reduce(
            (acc, row, index) => ({
              ...acc,
              [index]: row.find((cell) => cell.group === group).value,
            }),
            { group }
          )
        )
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

  chartProps.argumentAxisLabelAs = useAutoCallback(({ text, ...props }) => (
    <ChartLabel {...props} text={header[text].text} />
  ));
  chartProps.legendLabelAs = useAutoCallback(({ text, ...props }) => (
    <ChartLabel {...props} text={titles[text]} />
  ));

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
    <PieChart {...chartProps} as={ChartItem} data-type={'pie'} ref={ref} />
  ) : kind === chartTypes.COLUMN ? (
    <ColumnChart
      {...chartProps}
      as={ChartItem}
      data-type={'column'}
      ref={ref}
    />
  ) : kind === chartTypes.BAR ? (
    <BarChart {...chartProps} as={ChartItem} data-type={'bar'} ref={ref} />
  ) : (
    <LineChart {...chartProps} as={ChartItem} data-type={'line'} ref={ref} />
  );
});

export default Chart;

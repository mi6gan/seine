// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import ChartLegend from './ChartLegend';
import { defaultChartLegend } from './constants';

// eslint-disable-next-line
export default function BarChartDescription({
  elements,
  legend = defaultChartLegend,
  ...legendProps
}: Props) {
  return (
    <ChartLegend
      {...legendProps}
      elements={useAutoMemo(legend ? elements : [])}
    />
  );
}

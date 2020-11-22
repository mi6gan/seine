// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import ChartLegend from './ChartLegend';
import { titleIdentityElements } from './helpers';
import { defaultChartLegend } from './constants';

// eslint-disable-next-line
export default function ChartDescription({
  elements,
  legend = defaultChartLegend,
  ...legendProps
}: Props) {
  return (
    <ChartLegend
      {...legendProps}
      elements={useAutoMemo(legend ? titleIdentityElements(elements) : [])}
    />
  );
}

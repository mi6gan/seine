// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core/src/types';
import { useAutoMemo } from 'hooks.macro';

import type { Props as ChartLegendProps } from './ChartLegend';
import ChartLegend from './ChartLegend';
import { defaultPieChartLegend } from './constants';

type Props = $Rest<ChartLegendProps, {| kind: ChartType |}> & {
  legend?: boolean,
};

/**
 * @description Legend of pie chart slices.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartDescription({
  elements,
  legend = defaultPieChartLegend,
  ...legendProps
}: Props) {
  return (
    <ChartLegend
      {...legendProps}
      elements={useAutoMemo(legend ? elements : [])}
    />
  );
}

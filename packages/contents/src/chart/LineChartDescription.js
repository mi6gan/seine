// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core/src/types';
import { useAutoMemo } from 'hooks.macro';

import type { Props as ChartLegendProps } from './ChartLegend';
import ChartLegend from './ChartLegend';
import { titleIdentityElements } from './helpers';
import { defaultChartLegend } from './constants';

type Props = $Rest<ChartLegendProps, {| kind: ChartType |}> & {
  legend?: boolean,
};

/**
 * @description Legend of column chart groups.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartDescription({
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

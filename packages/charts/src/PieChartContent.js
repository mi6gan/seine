// @flow
import * as React from 'react';
import type { ChartElement } from '@seine/core';

import PieChartFormattedContent from './PieChartFormattedContent';
import PieChartSimpleContent from './PieChartSimpleContent';

type Props = {
  autoFormat: boolean,
  elements: ChartElement[],

  palette?: string[],
  units?: string,

  elementPathAs?: React.ElementType,
  elementTitleAs?: React.ElementType,
  elementValueAs?: React.ElementType,

  onAutoFormat?: ($Shape<Props>) => any,
};

/**
 * @description Pie chart content block renderer.
 * @param {Props}: props
 * @returns {React.Node}
 */
export default function PieChartContent({
  autoFormat = false,
  ...contentProps
}): Props {
  return autoFormat ? (
    <PieChartFormattedContent {...contentProps} />
  ) : (
    <PieChartSimpleContent {...contentProps} />
  );
}

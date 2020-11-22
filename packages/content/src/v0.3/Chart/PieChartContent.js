// @flow
import * as React from 'react';

import PieChartFormattedContent from './PieChartFormattedContent';
import PieChartSimpleContent from './PieChartSimpleContent';

import type { ChartElement } from '@seine/core';

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

// eslint-disable-next-line
export default function PieChartContent({
  autoFormat = false,
  parentType,
  onAutoFormat,
  ...contentProps
}): Props {
  return autoFormat ? (
    <PieChartFormattedContent onAutoFormat={onAutoFormat} {...contentProps} />
  ) : (
    <PieChartSimpleContent {...contentProps} />
  );
}

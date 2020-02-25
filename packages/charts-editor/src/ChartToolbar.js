// @flow
import * as React from 'react';
import type {
  AddButtonProps,
  BlockType,
  ChartBody,
  ChartFormat,
  ToolbarProps,
} from '@seine/core';
import { chartTypes } from '@seine/core';
import { Toolbar } from '@seine/ui';
import {
  defaultBarChartFormat,
  defaultChartFormat,
  useChartFormatDefaults,
} from '@seine/charts';

import ColumnChartToolbar from './ColumnChartToolbar';
import BarChartToolbar from './BarChartToolbar';
import PieChartToolbar from './PieChartToolbar';
import LineChartToolbar from './LineChartToolbar';

type Props = $Rest<
  ToolbarProps,
  {|
    addButtonRenderMap: {
      [BlockType]: React$Component<AddButtonProps>,
    },
  |}
> & {
  body: ChartBody,
  format: ChartFormat,
};

/**
 * @description Action buttons to edit currently selected chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartToolbar({
  children,
  format,
  ...toolbarProps
}: Props) {
  format = format || {};
  format = useChartFormatDefaults(format.kind, format);

  return format.kind === chartTypes.BAR ? (
    <BarChartToolbar
      {...toolbarProps}
      format={{ ...defaultBarChartFormat, ...format }}
    >
      {children}
    </BarChartToolbar>
  ) : format.kind === chartTypes.COLUMN ? (
    <ColumnChartToolbar
      {...toolbarProps}
      format={{ ...defaultChartFormat, ...format }}
    >
      {children}
    </ColumnChartToolbar>
  ) : format.kind === chartTypes.LINE ? (
    <LineChartToolbar
      {...toolbarProps}
      format={{ ...defaultChartFormat, ...format }}
    >
      {children}
    </LineChartToolbar>
  ) : format.kind === chartTypes.PIE ? (
    <PieChartToolbar
      {...toolbarProps}
      format={{ ...defaultChartFormat, ...format }}
    >
      {children}
    </PieChartToolbar>
  ) : (
    <Toolbar>{children}</Toolbar>
  );
}

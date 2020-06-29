// @flow
import * as React from 'react';
import type {
  AddButtonProps,
  BlockType,
  ChartBody,
  ChartFormat,
  ToolbarProps,
} from '@seine/core';
import { chartTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { Toolbar } from '@seine/ui';
import {
  defaultChartFormat,
  defaultChartHeight,
  useChartFormatDefaults,
} from '@seine/charts';
import styled from 'styled-components/macro';
import { TextField } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';

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

const Input = styled(TextField)`
  && {
    max-width: 4em;
  }
`;

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
  const { dispatch } = toolbarProps;
  format = format || {};
  format = useChartFormatDefaults(format.kind, format);
  children = (
    <>
      <Input
        type={'number'}
        placeholder={'height'}
        value={format.height || defaultChartHeight}
        onChange={useAutoCallback((event) => {
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: { height: +event.currentTarget.value },
          });
        })}
      />
      <Toolbar.Separator />
      {children}
    </>
  );

  return (
    <>
      {format.kind === chartTypes.COLUMN ? (
        <ColumnChartToolbar
          {...toolbarProps}
          format={{ ...defaultChartFormat, ...format }}
        >
          {children}
        </ColumnChartToolbar>
      ) : format.kind === chartTypes.BAR ? (
        <BarChartToolbar
          {...toolbarProps}
          format={{ ...defaultChartFormat, ...format }}
        >
          {children}
        </BarChartToolbar>
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
      )}
    </>
  );
}

// @flow
import * as React from 'react';
import type { ChartBody, ChartFormat, ToolbarProps } from '@seine/core';
import { Toolbar } from '@seine/ui';
import {
  defaultChartBody,
  defaultChartEditor,
  defaultChartFormat,
} from '@seine/charts';

import ChartElementColorButton from './ChartElementColorButton';
import ChartElementRemoveButton from './ChartElementRemoveButton';
import ChartPaletteSelect from './ChartPaletteSelect';
import ChartUnitsInput from './ChartUnitsInput';
import ChartElementAddButton from './ChartElementAddButton';
import ChartSwitchFormatInput from './ChartSwitchFormatInput';

type Props = ToolbarProps & {
  body: ChartBody,
  format: ChartFormat,
};

/**
 * @description Action buttons to edit currently selected pie chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartToolbar({
  body,
  children,
  dispatch,
  editor,
  format,
  id,
  ...toolbarProps
}: Props) {
  body = body || defaultChartBody;
  editor = editor || defaultChartEditor;
  format = format || defaultChartFormat;
  return (
    <Toolbar {...toolbarProps}>
      {children}

      {editor.selection > -1 && (
        <>
          <ChartElementRemoveButton
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          >
            Remove slice
          </ChartElementRemoveButton>

          <Toolbar.Separator />
        </>
      )}

      <ChartElementAddButton
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={{ ...format, minValue: 10 }}
        id={id}
      >
        Add slice
      </ChartElementAddButton>

      <Toolbar.Separator />

      {editor.selection === -1 && (
        <ChartPaletteSelect
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        />
      )}

      {editor.selection > -1 && (
        <ChartElementColorButton
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        />
      )}

      <Toolbar.Separator />

      <ChartUnitsInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <ChartSwitchFormatInput
        dispatch={dispatch}
        format={format}
        label={'show legend'}
        id={id}
        name={'legend'}
      />

      <ChartSwitchFormatInput
        dispatch={dispatch}
        format={format}
        label={'auto-fit'}
        id={id}
        name={'autoFormat'}
      />
    </Toolbar>
  );
}

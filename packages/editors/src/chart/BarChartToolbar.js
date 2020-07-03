// @flow
import * as React from 'react';
import type { ChartBody, ChartFormat, ToolbarProps } from '@seine/core';
import { Toolbar } from '@seine/ui';
import {
  columnChartMaxElements,
  columnChartMaxGroups,
  defaultChartBody,
  defaultChartEditor,
  defaultChartFormat,
} from '@seine/contents';

import ChartElementAddButton from './ChartElementAddButton';
import ChartMinValueInput from './ChartMinValueInput';
import ChartMaxValueInput from './ChartMaxValueInput';
import ChartValueStepInput from './ChartValueStepInput';
import ChartElementColorButton from './ChartElementColorButton';
import ChartPaletteSelect from './ChartPaletteSelect';
import ChartElementRemoveByIdButton from './ChartElementRemoveByIdButton';
import ChartGroupAddButton from './ChartGroupAddButton';
import ChartSwitchFormatInput from './ChartSwitchFormatInput';
import ChartUnitsInput from './ChartUnitsInput';
import ChartGroupRemoveButton from './ChartGroupRemoveButton';
import ChartFractionInput from './ChartFractionInput';

type Props = ToolbarProps & {
  body: ChartBody,
  format: ChartFormat,
};

/**
 * @description Action buttons to edit currently selected column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartToolbar({
  id,
  editor,
  format,
  body,
  dispatch,
  children,
  ...toolbarProps
}: Props) {
  body = body || defaultChartBody;
  editor = editor || defaultChartEditor;
  format = format || defaultChartFormat;
  const elementsCount = React.useMemo(
    () => new Set(body.elements.map(({ id }) => id)).size,
    [body.elements]
  );
  const groupsCount = React.useMemo(
    () => new Set(body.elements.map(({ group }) => group)).size,
    [body.elements]
  );
  return (
    <Toolbar {...toolbarProps}>
      {children}

      <ChartGroupAddButton
        body={body}
        disabled={groupsCount >= columnChartMaxGroups}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartGroupRemoveButton
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      {editor.selection > -1 && (
        <>
          <ChartElementRemoveByIdButton
            body={body}
            disabled={elementsCount <= 1}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
          <Toolbar.Separator />
        </>
      )}

      <ChartElementAddButton
        body={body}
        dispatch={dispatch}
        disabled={elementsCount >= columnChartMaxElements}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      {editor.selection > -1 && (
        <>
          <ChartElementColorButton
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
          <Toolbar.Separator />
        </>
      )}

      {editor.selection === -1 && (
        <>
          <ChartPaletteSelect
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
          <Toolbar.Separator />
        </>
      )}

      <ChartUnitsInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartFractionInput
        body={body}
        dispatch={dispatch}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartMinValueInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <ChartMaxValueInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <ChartValueStepInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartSwitchFormatInput
        dispatch={dispatch}
        format={format}
        label={'x'}
        id={id}
        name={'xAxis'}
      />

      <ChartSwitchFormatInput
        dispatch={dispatch}
        format={format}
        label={'show legend'}
        id={id}
        name={'legend'}
      />

      <Toolbar.Separator />
    </Toolbar>
  );
}

// @flow
import * as React from 'react';
import {
  blockTypes,
  chartTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import { BarChart as ColumnChartIcon } from '@material-ui/icons';

import { EditorContext } from '../store';
import useEditorBuffer from '../store/useEditorBuffer';
import ToolbarButton from '../ui/ToolbarButton';

// eslint-disable-next-line
export default function ColumnChartIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
  const buffer = useEditorBuffer();
  const selected =
    buffer &&
    buffer.type === blockTypes.CHART &&
    buffer.format &&
    buffer.format.kind === chartTypes.COLUMN;

  return (
    <ToolbarButton
      onMouseDown={useAutoCallback(() =>
        setBuffer(
          createBlock(
            blockTypes.CHART,
            {
              elements: createTitleIdentityBlockElements([
                {
                  title: 'First item',
                  group: 'Group 1',
                  value: 30,
                },
                {
                  title: 'Second item',
                  group: 'Group 2',
                  value: 70,
                },
                {
                  title: 'First item',
                  group: 'Group 1',
                  value: 40,
                },
                {
                  title: 'Second item',
                  group: 'Group 2',
                  value: 20,
                },
              ]),
            },
            {
              verticalAlignment: 'center',
              kind: chartTypes.COLUMN,
            }
          )
        )
      )}
      bgcolor={selected ? 'grey.800' : 'inherit'}
    >
      <ColumnChartIcon />
    </ToolbarButton>
  );
}

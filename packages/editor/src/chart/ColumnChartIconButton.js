// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { EditorContext, useBlocksBuffer } from '../context';
import ToolbarButton from '../ui/ToolbarButton';

import { BlockTypeIcon } from '@seine/editor';
import {
  blockTypes,
  chartTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';

// eslint-disable-next-line
export default function ColumnChartIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
  const buffer = useBlocksBuffer();
  const selected =
    buffer &&
    buffer.type === blockTypes.CHART &&
    buffer.format &&
    buffer.format.kind === chartTypes.COLUMN;

  return (
    <ToolbarButton
      onMouseDown={useAutoCallback(() =>
        setBuffer(
          selected
            ? null
            : createBlock(
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
      <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.COLUMN} />
    </ToolbarButton>
  );
}

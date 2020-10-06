// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { EditorContext, useBlocksBuffer } from '../context';
import ToolbarButton from '../ui/ToolbarButton';

import { BlockTypeIcon } from '@seine/editor';
import { blockTypes, chartTypes, createBlock } from '@seine/core';

// eslint-disable-next-line
export default function PieChartIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
  const buffer = useBlocksBuffer();
  const selected =
    buffer &&
    buffer.type === blockTypes.CHART &&
    buffer.format &&
    buffer.format.kind === chartTypes.PIE;

  return (
    <ToolbarButton
      onMouseDown={useAutoCallback(() =>
        setBuffer(
          selected
            ? null
            : createBlock(
                blockTypes.CHART,
                {
                  elements: [
                    {
                      title: 'First slice',
                      value: 30,
                    },
                    {
                      title: 'Second slice',
                      value: 70,
                    },
                  ],
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.PIE,
                }
              )
        )
      )}
      bgcolor={selected ? 'grey.800' : 'inherit'}
    >
      <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.PIE} />
    </ToolbarButton>
  );
}

// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { BlocksContext, useBlocksBuffer } from '../context';
import ToolbarButton from '../ui/ToolbarButton';

import { BlockTypeIcon } from '@seine/editor';
import {
  blockTypes,
  chartTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';

// eslint-disable-next-line
export default function BarChartIconButton() {
  const { setBuffer } = React.useContext(BlocksContext);
  const buffer = useBlocksBuffer();
  const selected =
    buffer &&
    buffer.type === blockTypes.CHART &&
    buffer.format &&
    buffer.format.kind === chartTypes.BAR;

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
                      value: 30,
                    },
                    {
                      title: 'Second item',
                      value: 70,
                    },
                  ]),
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.BAR,
                }
              )
        )
      )}
      bgcolor={selected ? 'grey.800' : 'inherit'}
    >
      <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.BAR} />
    </ToolbarButton>
  );
}

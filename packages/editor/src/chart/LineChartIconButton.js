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
export default function LineChartIconButton() {
  const { setBuffer } = React.useContext(BlocksContext);
  const buffer = useBlocksBuffer();
  const selected =
    buffer &&
    buffer.type === blockTypes.CHART &&
    buffer.format &&
    buffer.format.kind === chartTypes.LINE;

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
                      title: 'Top',
                      value: 100,
                      group: 'group 1',
                    },
                    {
                      title: 'Bottom',
                      value: 10,
                      group: 'group 1',
                    },
                    {
                      title: 'Top',
                      value: 100,
                      group: 'group 2',
                    },
                    {
                      title: 'Bottom',
                      value: 10,
                      group: 'group 2',
                    },
                  ]),
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.LINE,
                }
              )
        )
      )}
      bgcolor={selected ? 'grey.800' : 'inherit'}
    >
      <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.LINE} />
    </ToolbarButton>
  );
}

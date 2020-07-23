// @flow
import * as React from 'react';
import {
  blockTypes,
  chartTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import { ShowChart as LineChartIcon } from '@material-ui/icons';

import { EditorContext } from '../store';
import useBlocksBuffer from '../store/useBlocksBuffer';
import ToolbarButton from '../ui/ToolbarButton';

// eslint-disable-next-line
export default function LineChartIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
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
      <LineChartIcon />
    </ToolbarButton>
  );
}

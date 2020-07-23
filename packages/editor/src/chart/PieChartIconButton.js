// @flow
import * as React from 'react';
import { blockTypes, chartTypes, createBlock } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import { PieChart as PieChartIcon } from '@material-ui/icons';

import { EditorContext } from '../store';
import useBlocksBuffer from '../store/useBlocksBuffer';
import ToolbarButton from '../ui/ToolbarButton';

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
      <PieChartIcon />
    </ToolbarButton>
  );
}

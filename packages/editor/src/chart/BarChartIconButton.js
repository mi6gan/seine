// @flow
import * as React from 'react';
import {
  blockTypes,
  chartTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';
import { BarChart as ColumnChartIcon } from '@material-ui/icons';

import { EditorContext } from '../store';
import useBlocksBuffer from '../store/useBlocksBuffer';
import ToolbarButton from '../ui/ToolbarButton';

const BarChartIcon = styled(ColumnChartIcon).attrs({
  transform: 'rotate(90)',
})``;

// eslint-disable-next-line
export default function BarChartIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
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
      <BarChartIcon />
    </ToolbarButton>
  );
}

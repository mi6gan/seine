// @flow
import * as React from 'react';
import { blockTypes, chartTypes, CREATE_BLOCK, createBlock } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';
import { PieChart as PieChartIcon } from '@material-ui/icons';

import ActionIconButton from '../ui/ActionIconButton';

// eslint-disable-next-line
export default function PieChartIconButton({
  type = null,
  block = null,
  parentId,
  dispatch,
}) {
  return (
    <ActionIconButton
      selected={
        type === CREATE_BLOCK &&
        block &&
        block.type === blockTypes.CHART &&
        block.format &&
        block.format.kind === chartTypes.PIE
      }
      type={CREATE_BLOCK}
      block={useAutoMemo(
        block === null &&
          createBlock(
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
            },
            parentId
          )
      )}
      Icon={PieChartIcon}
      dispatch={dispatch}
    />
  );
}

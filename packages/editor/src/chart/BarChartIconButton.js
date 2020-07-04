// @flow
import * as React from 'react';
import {
  blockTypes,
  chartTypes,
  CREATE_BLOCK,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { useAutoMemo } from 'hooks.macro';

import ActionIconButton from '../ui/ActionIconButton';
import BarChartIcon from '../chart/BarChartIcon';

// eslint-disable-next-line
export default function BarChartIconButton({
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
        block.format.kind === chartTypes.BAR
      }
      type={CREATE_BLOCK}
      block={useAutoMemo(
        block === null &&
          createBlock(
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
            },
            parentId
          )
      )}
      Icon={BarChartIcon}
      dispatch={dispatch}
    />
  );
}

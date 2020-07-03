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
import { ShowChart as LineChartIcon } from '@material-ui/icons';

import ActionIconButton from '../ui/ActionIconButton';

// eslint-disable-next-line
export default function LineChartIconButton({
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
        block.format.kind === chartTypes.LINE
      }
      type={CREATE_BLOCK}
      block={useAutoMemo(
        block === null &&
          createBlock(
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
            },
            parentId
          )
      )}
      Icon={LineChartIcon}
      dispatch={dispatch}
    />
  );
}

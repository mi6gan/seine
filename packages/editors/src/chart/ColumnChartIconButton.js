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
import { BarChart as ColumnChartIcon } from '@material-ui/icons';

import ActionIconButton from '../ui/ActionIconButton';

// eslint-disable-next-line
export default function ColumnChartIconButton({
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
        block.format.kind === chartTypes.COLUMN
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
            },
            parentId
          )
      )}
      Icon={ColumnChartIcon}
      dispatch={dispatch}
    />
  );
}

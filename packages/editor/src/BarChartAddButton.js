// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import {
  blockTypes,
  createBlock,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { ActionButton } from '@seine/ui';
import { defaultBarChartFormat } from '@seine/charts';

type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  children?: React.Node,
  dispatch: (BlocksAction) => any,
  title?: string,
};

/**
 * @description Action button to create bar chart block.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartAddButton({
  children = 'Bar chart',
  title = 'Add bar chart',
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      {...buttonProps}
      block={createBlock(
        blockTypes.CHART,
        {
          elements: createTitleIdentityBlockElements([
            {
              title: 'First line',
              value: 35,
            },
            {
              title: 'Second line',
              value: 70,
            },
          ]),
        },
        defaultBarChartFormat
      )}
      title={title}
    >
      {children}
    </ActionButton>
  );
}

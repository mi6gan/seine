// @flow
import * as React from 'react';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';
import { blockTypes, createBlock } from '@seine/core';
import { toRawContent } from '@seine/draft';
import { ActionButton } from '@seine/ui';

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
export default function DraftAddButton({
  children = 'Rich text',
  title = 'Add text block',
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      block={createBlock(blockTypes.RICH_TEXT, toRawContent('Rich text'), {
        verticalAlignment: 'center',
      })}
      title={title}
      {...buttonProps}
    >
      {children}
    </ActionButton>
  );
}

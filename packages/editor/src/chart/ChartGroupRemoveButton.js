// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { groupElements } from '@seine/content';
import type {
  BlockId,
  ChartBody,
  ChartFormat,
  BlocksAction,
} from '@seine/core';

type Props = {
  body: ChartBody,
  children?: string,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Button that removes elements of a group.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartGroupRemoveButton({
  body,
  children = 'Rm group',
  title = 'Remove element',
  dispatch,
  id,
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      {...buttonProps}
      body={React.useMemo(
        () => ({
          elements: groupElements(body.elements)
            .slice(0, -1)
            .reduce((acc, [_, elements]) => [...acc, ...elements], []),
        }),
        [body.elements]
      )}
      disabled={React.useMemo(
        () => new Set(body.elements.map(({ group }) => group)).size <= 1,
        [body.elements]
      )}
      dispatch={dispatch}
      id={id}
      title={title}
      type={UPDATE_BLOCK_BODY}
      variant={'text'}
    >
      {children}
    </ActionButton>
  );
}

// @flow
import * as React from 'react';
import { groupElements, titleIdentityElements } from '@seine/charts';
import { ActionButton } from '@seine/ui';
import type {
  BlockId,
  BlocksAction,
  ChartBody,
  ChartFormat,
} from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';

type Props = {
  body: ChartBody,
  children?: string,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Button that adds group by copying existent.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartGroupAddButton({
  id,
  children = 'Add group',
  dispatch,
  format,
  body,
  ...buttonProps
}) {
  const { length: groupsCount } = groupElements(body.elements);
  return (
    <ActionButton
      {...buttonProps}
      id={id}
      title={'Add group'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: [
            ...body.elements.map(({ group, ...element }) => ({
              ...element,
              ...(group && group.length
                ? { group }
                : { group: `Group #${groupsCount}` }),
            })),
            ...titleIdentityElements(body.elements).map(({ id, title }) => ({
              id,
              title,
              group: `Group #${groupsCount + 1}`,
              value: format.minValue || 0,
            })),
          ],
        }),
        [body.elements, format.minValue, groupsCount]
      )}
      variant={'text'}
    >
      {children}
    </ActionButton>
  );
}

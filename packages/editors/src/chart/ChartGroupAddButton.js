// @flow
import * as React from 'react';
import { groupElements, titleIdentityElements } from '@seine/contents';
import { ActionButton } from '@seine/ui';
import type {
  BlockId,
  BlocksAction,
  ChartBody,
  ChartFormat,
} from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';

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
  const elements = body.elements.map((element) =>
    element.group && element.group.length
      ? element
      : { ...element, group: `Group #${groupsCount}` }
  );
  return (
    <ActionButton
      {...buttonProps}
      id={id}
      title={'Add group'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={useAutoMemo({
        elements: [
          ...elements,
          ...titleIdentityElements(elements).map((element) => ({
            ...element,
            group: `Group #${groupsCount + 1}`,
            value: format.minValue || 0,
          })),
        ],
      })}
      variant={'text'}
    >
      {children}
    </ActionButton>
  );
}

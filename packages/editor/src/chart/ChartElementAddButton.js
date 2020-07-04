// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import {
  createTitleIdentityBlockElements,
  UPDATE_BLOCK_BODY,
} from '@seine/core';
import { groupElements } from '@seine/content';
import type {
  BlockId,
  ChartBody,
  ChartFormat,
  BlocksAction,
} from '@seine/core';
import { useAutoMemo } from 'hooks.macro';

type Props = {
  body: ChartBody,
  children?: string,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Button that adds an element (to each group).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartElementAddButton({
  body,
  children = 'Add item',
  dispatch,
  format,
  id,
  ...buttonProps
}: Props) {
  const values = useAutoMemo(body.elements.map(({ value }) => value));
  const minValue = useAutoMemo(format.minValue || Math.min(...values));
  const maxValue = useAutoMemo(format.maxValue || Math.max(...values));
  return (
    <ActionButton
      {...buttonProps}
      id={id}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={useAutoMemo({
        elements: [
          ...body.elements,
          ...createTitleIdentityBlockElements(
            groupElements(body.elements).map(([group, { length }]) => ({
              ...(group ? { group } : {}),
              title: `Item #${length}`,
              value: minValue + Math.floor((maxValue - minValue) / 2),
            }))
          ),
        ],
      })}
      variant={'text'}
    >
      {children}
    </ActionButton>
  );
}

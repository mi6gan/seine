// @flow
import * as React from 'react';
import { CompositeActionButton } from '@seine/ui';
import type {
  BlockId,
  BlocksAction,
  ChartBody,
  ChartFormat,
} from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';

type Props = {
  body: ChartBody,
  children?: string,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

// eslint-disable-next-line
export default function ChartElementRemoveButton({
  body,
  children = 'Rm item',
  dispatch,
  editor,
  id,
  ...buttonProps
}: Props) {
  return (
    <CompositeActionButton
      disabled={body.elements.length <= 2}
      {...buttonProps}
      title={'Remove element'}
      dispatch={dispatch}
      actions={React.useMemo(
        () => [
          {
            editor: { selection: -1 },
            id: id,
            type: UPDATE_BLOCK_EDITOR,
          },
          {
            body: {
              elements: [
                ...body.elements.slice(0, editor.selection),
                ...body.elements.slice(editor.selection + 1),
              ],
            },
            id: id,
            type: UPDATE_BLOCK_BODY,
          },
        ],
        [body.elements, editor.selection, id]
      )}
      variant={'text'}
    >
      {children}
    </CompositeActionButton>
  );
}

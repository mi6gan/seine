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
export default function ChartElementRemoveByIdButton({
  body,
  children = 'Rm item',
  dispatch,
  editor,
  id,
  ...buttonProps
}: Props) {
  const element =
    editor.selection >= 0
      ? body.elements.find(({ id }, index) => index === editor.selection)
      : null;
  return (
    <CompositeActionButton
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
              elements: element
                ? body.elements.filter(({ id }) => id !== element.id)
                : body.elements,
            },
            id: id,
            type: UPDATE_BLOCK_BODY,
          },
        ],
        [body.elements, element, id]
      )}
      variant={'text'}
    >
      {children}
    </CompositeActionButton>
  );
}

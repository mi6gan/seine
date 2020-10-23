// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import useEditorDispatch from './useEditorDispatch';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';
import type { Action } from '@seine/core';
import { createBlocksAction, cloneBlock } from '@seine/core';

export type Props = Action & React.ElementProps<HTMLButtonElement>;

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditorActionButton({
  as: Button = MuiButton,
  block,
  body,
  editor,
  format,
  group,
  id,
  index,
  mode,
  modifier,
  type,
  onClick,
  ...buttonProps
}: Props) {
  const dispatch = useEditorDispatch();
  return (
    <Button
      {...buttonProps}
      type={'button'}
      onClick={useAutoCallback((event) => {
        dispatch(
          createBlocksAction(
            type,
            (block && cloneBlock(block)) ||
              body ||
              editor ||
              format ||
              group ||
              index ||
              (mode && { mode, modifier }),
            id
          )
        );
        onClick && onClick(event);
      })}
    />
  );
}

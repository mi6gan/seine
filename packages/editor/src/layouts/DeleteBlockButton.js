// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import useSelectedLayoutItems from './useSelectedLayoutItems';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';
import { DELETE_SELECTED_BLOCKS } from '@seine/core';
import { ClipboardContext } from '@seine/editor';

// eslint-disable-next-line
export default function DeleteBlockButton({
  as: Button = MuiButton,
  onClick = null,
  children,
  ...buttonProps
}) {
  const clipboard = React.useContext(ClipboardContext);
  const { items } = useSelectedLayoutItems();

  return (
    <Button
      {...buttonProps}
      onClick={useAutoCallback((event) => {
        clipboard.push({ type: DELETE_SELECTED_BLOCKS });
        if (onClick) {
          onClick(event);
        }
      })}
      disabled={!items.length}
    >
      {children}
    </Button>
  );
}

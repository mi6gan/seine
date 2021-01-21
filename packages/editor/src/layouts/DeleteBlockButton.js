// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { ClipboardContext } from '../clipboard';

import useSelectedLayoutItems from './useSelectedLayoutItems';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';
import { DELETE_SELECTED_BLOCKS } from '@seine/core';

// eslint-disable-next-line
const DeleteBlockButton = React.forwardRef(function DeleteBlockButton(
  { as: Button = MuiButton, onClick = null, children, ...buttonProps },
  ref
) {
  const clipboard = React.useContext(ClipboardContext);
  const { items } = useSelectedLayoutItems();

  return (
    <Button
      {...buttonProps}
      ref={ref}
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
});

export default DeleteBlockButton;

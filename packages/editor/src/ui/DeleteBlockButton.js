// @flow
import * as React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';

import useSelectedLayoutItems from '../layout/useSelectedLayoutItems';
import { BlocksContext } from '../context';

import { DELETE_SELECTED_BLOCKS } from '@seine/core';

// eslint-disable-next-line
export default function DeleteBlockButton({
  as: Button = MuiButton,
  onClick = null,
  children,
  ...buttonProps
}) {
  const { items } = useSelectedLayoutItems();
  const { setBuffer } = React.useContext(BlocksContext);

  return (
    <Button
      {...buttonProps}
      onClick={useAutoCallback((event) => {
        setBuffer({ type: DELETE_SELECTED_BLOCKS });
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

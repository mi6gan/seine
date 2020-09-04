// @flow
import * as React from 'react';
import { Add as AddIcon } from '@material-ui/icons';
import { Box, Button, ClickAwayListener, Popover } from '@material-ui/core';
import type { AddButtonProps, BlockType } from '@seine/core';
import { blockTypes } from '@seine/core';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import Fab from './Fab';

export type Props = AddButtonProps & {
  addButtonRenderMap: {
    [BlockType]: React.ComponentType<AddButtonProps>,
  },
};

/**
 * @description Fab of the actions to add a block relative to the current one.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockAddFab({
  addButtonRenderMap,
  id,
  dispatch,
  type,
  ...fabProps
}: Props) {
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);
  const preventBubblingUp = useAutoCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  return (
    <ClickAwayListener
      onClickAway={useAutoCallback((event) => {
        event.stopPropagation();
        setOpen(false);
      })}
    >
      <Box position={'relative'}>
        <Fab
          size={'small'}
          {...fabProps}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen(true);
          }}
          ref={anchorEl}
        >
          <AddIcon />
        </Fab>
        <Popover
          anchorEl={anchorEl.current}
          open={open}
          transitionDuration={0}
          keepMounted
        >
          {useAutoMemo(
            Object.values(blockTypes).map((blockType) => {
              const BlockAddButton = addButtonRenderMap[blockType];
              return (
                <BlockAddButton
                  as={Button}
                  dispatch={dispatch}
                  id={id}
                  fullWidth
                  key={blockType}
                  type={type}
                  variant={'text'}
                  onClick={preventBubblingUp}
                />
              );
            })
          )}
        </Popover>
      </Box>
    </ClickAwayListener>
  );
}

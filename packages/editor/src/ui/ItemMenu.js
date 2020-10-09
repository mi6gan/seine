// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { Box, ButtonBase, MenuItem } from '@material-ui/core';
import styled from 'styled-components/macro';

import {
  ClipboardContext,
  useBlocksSelector,
  useBlocksDispatch,
} from '../context';
import { selectionSelector } from '../selectors';

import ToolbarMenu from './ToolbarMenu';
import CreateLayoutButton from './CreateLayoutButton';
import DeleteBlockButton from './DeleteBlockButton';

import { CREATE_BLOCK, blockTypes, createBlock } from '@seine/core';
import type { Block } from '@seine/core';

const MenuButton = styled(Box).attrs(({ disabled }) => ({
  component: ButtonBase,
  color: disabled ? 'grey.500' : 'inherit',
  w: 1,
}))``;

type ItemMenuType = {
  isOpen: boolean,
  close: () => void,
  open: (anchorEl: HTMLElement) => void,
  anchorEl: HTMLElement | null,
};

const defaultItemMenu: ItemMenuType = {
  isOpen: false,
  close: () => void 0,
  open: () => void 0,
  anchorEl: null,
};
export const ItemMenuContext = React.createContext<ItemMenuType>(
  defaultItemMenu
);

// eslint-disable-next-line
export function ItemMenuProvider({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const close = useAutoCallback(() => {
    setAnchorEl(null);
  });
  const isOpen = anchorEl !== null;

  return (
    <ItemMenuContext.Provider
      value={useAutoMemo({
        isOpen,
        open: setAnchorEl,
        close,
        anchorEl,
      })}
    >
      {children}
    </ItemMenuContext.Provider>
  );
}
/**
 * @description Selected item context menu.
 * @returns {React.Node}
 */
export default function ItemMenu() {
  const dispatch = useBlocksDispatch();
  const selected = useBlocksSelector(selectionSelector);
  const [block = null]: [Block] = useBlocksSelector();
  const { isOpen, close, anchorEl } = React.useContext(ItemMenuContext);
  const clipboard = React.useContext(ClipboardContext);

  const isContainer =
    block &&
    (block.type === blockTypes.LAYOUT || block.type === blockTypes.PAGE);

  return (
    <ToolbarMenu
      onClose={close}
      open={isOpen}
      anchorEl={anchorEl}
      keepMounted
      autoFocus
      mt={3}
    >
      <MenuItem onClick={close} {...(isContainer && { display: 'none' })}>
        <CreateLayoutButton
          as={MenuButton}
          disabled={!selected.length || isContainer}
        >
          Create layout
        </CreateLayoutButton>
      </MenuItem>

      <Box component={MenuItem} {...(isContainer && { display: 'none' })}>
        <MenuButton
          disabled={!selected.length || isContainer}
          onClick={useAutoCallback(() => {
            clipboard.replace({
              type: CREATE_BLOCK,
              block,
            });
            close();
          })}
        >
          Copy
        </MenuButton>
      </Box>

      <Box component={MenuItem} {...(!isContainer && { display: 'none' })}>
        <MenuButton
          disabled={
            !selected.length || !isContainer || clipboard.type !== CREATE_BLOCK
          }
          onClick={useAutoCallback(() => {
            dispatch({
              type: CREATE_BLOCK,
              block: createBlock(
                clipboard.block.type,
                clipboard.block.body,
                clipboard.block.format
              ),
              id: block.id,
            });
            close();
          })}
        >
          Paste
        </MenuButton>
      </Box>

      <MenuItem onClick={close}>
        <DeleteBlockButton as={MenuButton}>Delete</DeleteBlockButton>
      </MenuItem>
    </ToolbarMenu>
  );
}

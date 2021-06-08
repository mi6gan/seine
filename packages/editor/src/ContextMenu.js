// @flow
import styled from 'styled-components/macro';
import * as React from 'react';

import { MenuContext } from './MenuProvider';
import type { MenuId } from './MenuProvider';

import { Menu } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';

const StyledMenu = styled(Box).attrs({ as: Menu })`
  .MuiMenu-paper {
    color: ${({ theme }) => theme.palette.grey[50]};
    background-color: ${({ theme }) => theme.palette.grey[700]};
    min-width: 10em;
  }
`;

type Props = {
  id: MenuId,
};

/**
 * @description Toolbar menu.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContextMenu({
  id,
  children = null,
  ...menuProps
}: Props) {
  const menu = React.useContext(MenuContext);
  return (
    <StyledMenu
      {...menuProps}
      open={menu.id === id}
      anchorEl={menu.anchorEl}
      onClose={menu.close}
      autoFocus
      mt={3}
      onClick={menu.close}
    >
      {children}
    </StyledMenu>
  );
}

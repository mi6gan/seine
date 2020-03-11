// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import {
  AppBar as MuiAppBar,
  Divider,
  Toolbar as MuiToolbar,
} from '@material-ui/core';

Toolbar.Group = ({ children }) => <>{children}</>;

Toolbar.Separator = styled(({ orientation = 'vertical', ...props }) => (
  <Divider {...props} orientation={orientation} />
))`
  && {
    ${({ theme }) => css`
      margin-left: ${theme.spacing(2)}px;
      margin-right: ${theme.spacing(2)}px;
    `}
  }
`;

const AppBar = styled(MuiAppBar)`
  && {
    background-color: ${({ theme }) =>
      css`
        ${theme.palette.grey[400]}
      `};
  }
`;

type Props = {
  children: React.Node,
  position?: 'fixed' | 'relative',
};

/**
 * @description Toolbar
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Toolbar({
  position = 'relative',

  addButtonRenderMap,
  blocks,

  ...toolbarProps
}: Props) {
  return (
    <AppBar position={position}>
      <MuiToolbar {...toolbarProps} />
    </AppBar>
  );
}

// @flow
import styled from 'styled-components/macro';

import { Box, Menu } from '../../material-ui.macro';

const ToolbarMenu = styled(Box).attrs({ component: Menu })`
  .MuiMenu-paper {
    color: ${({ theme }) => theme.palette.grey[50]};
    background-color: ${({ theme }) => theme.palette.grey[700]};
    min-width: 10em;
  }
`;

export default ToolbarMenu;

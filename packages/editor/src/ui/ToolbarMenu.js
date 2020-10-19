// @flow
import styled from 'styled-components/macro';

import { Menu } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';

const ToolbarMenu = styled(Box).attrs({ as: Menu })`
  .MuiMenu-paper {
    color: ${({ theme }) => theme.palette.grey[50]};
    background-color: ${({ theme }) => theme.palette.grey[700]};
    min-width: 10em;
  }
`;

export default ToolbarMenu;

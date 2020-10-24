// @flow
import styled from 'styled-components/macro';

import { Drawer } from '@seine/styles/mui-core.macro';

const Sidebar = styled(Drawer).attrs({
  variant: 'permanent',
})`
  .MuiPaper-root {
    overflow: auto;
    min-height: 760px;
    width: 280px;
    padding: ${({ theme }) => theme.spacing(0, 2)};
  }
`;

export default Sidebar;

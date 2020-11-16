// @flow
import styled from 'styled-components/macro';

import { Box } from '@seine/styles';

const Sidebar = styled(Box).attrs({
  bgcolor: 'background.paper',
  color: 'grey.700',
  height: 760,
  minWidth: 290,
  px: 2,
  overflow: 'auto',
})``;

export default Sidebar;

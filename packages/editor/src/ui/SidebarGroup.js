// @flow
import styled from 'styled-components/macro';

import { Box } from '../../material-ui.macro';

const SidebarGroup = styled(Box).attrs(
  ({ alignItems = 'flex-end', ml = 1, my = 1, display = 'flex' }) => ({
    display,
    alignItems,
    ml,
    my,
  })
)``;

export default SidebarGroup;

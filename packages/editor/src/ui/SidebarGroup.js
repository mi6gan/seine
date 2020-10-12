// @flow
import styled from 'styled-components/macro';

import { Box } from '../../mui-core.macro';

const SidebarGroup = styled(Box).attrs(
  ({ alignItems = 'flex-end', ml = 1, my = 1, display = 'flex' }) => ({
    display,
    alignItems,
    ml,
    my,
  })
)``;

export default SidebarGroup;

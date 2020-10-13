// @flow
import styled from 'styled-components/macro';

import { Box } from '@seine/styles/mui-core.macro';

const SidebarGroup = styled(Box).attrs(
  ({
    alignItems = 'center',
    my = 1,
    mt = my,
    mb = my,
    ml = 1,
    display = 'flex',
  }) => ({
    display,
    alignItems,
    ml,
    mt,
    mb,
  })
)``;

export default SidebarGroup;

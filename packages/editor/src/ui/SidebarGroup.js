// @flow
import { Box } from '@material-ui/core';
import styled from 'styled-components/macro';

const SidebarGroup = styled(Box).attrs(
  ({ alignItems = 'flex-end', ml = 1, my = 1, display = 'flex' }) => ({
    display,
    alignItems,
    ml,
    my,
  })
)``;

export default SidebarGroup;

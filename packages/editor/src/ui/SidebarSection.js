// @flow
import { Box } from '@material-ui/core';
import styled from 'styled-components/macro';

const SidebarSection = styled(Box).attrs(({ py = 2 }) => ({ py }))`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export default SidebarSection;

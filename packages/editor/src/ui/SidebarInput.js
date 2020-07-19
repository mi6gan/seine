// @flow
import { Box, Input } from '@material-ui/core';
import styled from 'styled-components/macro';

const SidebarInput = styled(Box).attrs(({ width = '3rem', mr = 1 }) => ({
  component: Input,
  variant: 'caption',
  mr,
  width,
}))`
  && {
    ${({ hidden }) => hidden && { display: 'none' }}
  }
`;

export default SidebarInput;

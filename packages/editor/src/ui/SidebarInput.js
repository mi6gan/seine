// @flow
import styled from 'styled-components/macro';

import { Box, Input } from '../../mui-core.macro';

const SidebarInput = styled(Box).attrs(({ width = '3rem', mr = 1 }) => ({
  component: Input,
  mr,
  width,
}))`
  && {
    ${({ hidden }) => hidden && { display: 'none' }}
    ${({ theme }) => theme.typography.caption}
  }
`;

export default SidebarInput;

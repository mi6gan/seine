// @flow
import styled from 'styled-components/macro';

import { Box } from '../../material-ui.macro';

const SidebarSection = styled(Box).attrs(({ py = 2, display = 'block' }) => ({
  py,
  display,
}))`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export default SidebarSection;

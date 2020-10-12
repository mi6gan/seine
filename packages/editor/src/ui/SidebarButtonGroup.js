// @flow
import styled from 'styled-components/macro';

import { Box } from '../../material-ui.macro';

const SidebarButtonGroup = styled(Box)`
  ${({ theme }) => ({ margin: theme.spacing(0, 1, 1, 0) })};
`;

export default SidebarButtonGroup;

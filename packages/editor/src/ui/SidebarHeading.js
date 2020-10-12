// @flow
import styled from 'styled-components/macro';

import { Typography } from '@seine/styles/mui-core.macro';

const SidebarHeading = styled(Typography).attrs({
  color: 'textPrimary',
  variant: 'caption',
})`
  && {
    font-weight: bold;
  }
`;

export default SidebarHeading;

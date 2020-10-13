// @flow
import styled from 'styled-components/macro';

import { Box, Typography } from '@seine/styles/mui-core.macro';

const SidebarLabel = styled(Box).attrs({
  component: Typography,
  variant: 'caption',
  minWidth: '5rem',
})``;

export default SidebarLabel;

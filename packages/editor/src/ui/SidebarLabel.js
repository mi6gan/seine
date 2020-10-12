// @flow
import styled from 'styled-components/macro';

import { Box, Typography } from '../../material-ui.macro';

const SidebarLabel = styled(Box).attrs({
  component: Typography,
  variant: 'caption',
  minWidth: '5rem',
})``;

export default SidebarLabel;

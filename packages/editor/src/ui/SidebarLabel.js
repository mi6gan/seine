// @flow
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

const SidebarLabel = styled(Box).attrs({
  component: Typography,
  variant: 'caption',
  minWidth: '6rem',
})``;

export default SidebarLabel;

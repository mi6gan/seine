// @flow
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

const SidebarSelectLabel = styled(Box).attrs({
  component: Typography,
  variant: 'caption',
  minWidth: '5rem',
})``;

export default SidebarSelectLabel;

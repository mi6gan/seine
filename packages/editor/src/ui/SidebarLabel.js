// @flow
import styled from 'styled-components/macro';

import { Typography } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';

const SidebarLabel = styled(Box).attrs([
  {
    as: Typography,
    variant: 'caption',
  },
  ({ minWidth = '5rem' }) => ({ minWidth }),
])``;

export default SidebarLabel;

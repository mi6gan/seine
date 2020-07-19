// @flow
import { Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

const SidebarHeading = styled(Typography).attrs({
  color: 'textPrimary',
  variant: 'caption',
})`
  && {
    font-weight: bold;
  }
`;

export default SidebarHeading;

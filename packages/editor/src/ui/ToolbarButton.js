// @flow
import styled from 'styled-components/macro';
import { Button } from '@material-ui/core';

const ToolbarButton = styled(Button).attrs(() => ({
  color: 'inherit',
}))`
  && {
    ${({ selected, theme }) =>
      selected && { backgroundColor: theme.palette.grey[800] }};
    border-radius: 0;
    min-width: 0;
  }
`;

export default ToolbarButton;

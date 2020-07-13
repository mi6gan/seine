// @flow
import styled from 'styled-components/macro';
import { ToggleButton } from '@material-ui/lab';

import ToolbarButton from './ToolbarButton';

const ToolbarToggleButton = styled(ToolbarButton).attrs({
  forwardedAs: ToggleButton,
})`
  &&& {
    color: currentColor;
    background-color: ${({ theme }) => theme.palette.action.active};
  }
  &&&.Mui-selected {
    color: currentColor;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }
  &&&:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
  &&& {
    border-color: ${({ theme }) => theme.palette.grey.A100};
  }
`;

export default ToolbarToggleButton;

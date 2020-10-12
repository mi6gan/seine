// @flow
import styled from 'styled-components/macro';
import { ToggleButton } from '@material-ui/lab';

import ToolbarButton from './ToolbarButton';

const ToolbarToggleButton = styled(ToggleButton).attrs({
  component: ToolbarButton,
})`
  &&& {
    color: currentColor;
    background-color: ${({ theme }) => theme.palette.action.active};
    border-color: ${({ theme }) => theme.palette.grey.A100};
    transition: ${({ theme }) =>
      theme.transitions.create(
        ['color', 'background-color', 'border-color', 'box-shadow'],
        {
          duration: theme.transitions.duration.standard,
          easing: 'ease-in-out',
        }
      )}};
    transition: background-color 0.15s;
  }
  &&&.Mui-selected {
    color: currentColor;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }
  &&&:hover {
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

export default ToolbarToggleButton;

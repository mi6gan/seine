// @flow
import styled from 'styled-components/macro';
import { ToggleButton } from '@material-ui/lab';

import { IconButton } from '@seine/styles/mui-core.macro';

const ToolbarToggleButton = styled(ToggleButton).attrs({
  component: IconButton,
  disableRipple: true,
})`
  &&& {
    color: ${({ theme }) => theme.palette.text.hint};
    background: none;
    border: none;
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
  &&&.Mui-selected,
  &&&.Mui-selected:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
  &&&:hover {
    background: none;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

export default ToolbarToggleButton;

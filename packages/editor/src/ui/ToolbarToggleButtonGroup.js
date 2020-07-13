// @flow
import styled from 'styled-components/macro';
import { ToggleButtonGroup } from '@material-ui/lab';

const ToolbarToggleButtonGroup = styled(ToggleButtonGroup).attrs({
  size: 'small',
  exclusive: true,
})`
  ${({ theme }) => ({ margin: theme.spacing(0, 1, 1, 0) })};
`;

export default ToolbarToggleButtonGroup;

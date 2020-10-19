// @flow
import styled from 'styled-components/macro';
import { ToggleButtonGroup } from '@material-ui/lab';

import { Box } from '@seine/styles';

const ToolbarToggleButtonGroup = styled(Box).attrs({
  as: ToggleButtonGroup,
  size: 'small',
  exclusive: true,
  ml: -1,
})``;

export default ToolbarToggleButtonGroup;

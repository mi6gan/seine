// @flow
import styled from 'styled-components/macro';
import { ToggleButtonGroup } from '@material-ui/lab';

import { Box } from '@seine/styles/mui-core.macro';

const ToolbarToggleButtonGroup = styled(Box).attrs({
  component: ToggleButtonGroup,
  size: 'small',
  exclusive: true,
})``;

export default ToolbarToggleButtonGroup;

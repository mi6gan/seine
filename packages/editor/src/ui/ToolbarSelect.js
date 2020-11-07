// @flow

import styled from 'styled-components/macro';
import { Select as MuiSelect } from '@material-ui/core';

const ToolbarSelect = styled(MuiSelect)`
  .MuiSelect-select {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

export default ToolbarSelect;

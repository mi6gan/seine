// @flow

import styled from 'styled-components/macro';
import { Select as MuiSelect } from '@material-ui/core';

const SidebarSelect = styled(MuiSelect)`
  .MuiSelect-select {
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
    padding-top: 0;
    padding-bottom: 5px;
  }
`;

export default SidebarSelect;

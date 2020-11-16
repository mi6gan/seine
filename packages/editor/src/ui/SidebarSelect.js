// @flow

import styled from 'styled-components/macro';
import { Select as MuiSelect } from '@material-ui/core';

const SidebarSelect = styled(MuiSelect)`
  .MuiSelect-select {
    ${({ paddingBottom = 5, width, textAlign }) => ({
      paddingBottom,
      ...(width && { width }),
      ...(textAlign && { textAlign }),
    })};

    font-size: ${({ theme, fontSize = theme.typography.caption.fontSize }) =>
      fontSize};

    font-weight: ${({
      theme,
      fontWeight = theme.typography.caption.fontWeight,
    }) => fontWeight};
};
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export default SidebarSelect;

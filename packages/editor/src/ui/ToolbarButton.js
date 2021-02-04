// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { borders, color, palette } from '@material-ui/system';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';

const StyledToolbarButton = styled(MuiButton).attrs(
  ({ color = 'inherit' }) => ({
    color,
    size: 'small',
  })
)`
  && {
    ${color};
    ${palette};
    ${borders};
    min-width: 0;
  }
  &&&& {
    border: none;
    border-radius: 0;
  }
`;

const ToolbarButton = React.forwardRef(function ToolbarButton(
  { as: Button = StyledToolbarButton, onMouseDown, ...props },
  ref
) {
  return (
    <Button
      as={StyledToolbarButton}
      {...props}
      ref={ref}
      onMouseDown={useAutoCallback((event) => {
        event.preventDefault();
        onMouseDown && onMouseDown(event);
      })}
    />
  );
});

export default ToolbarButton;

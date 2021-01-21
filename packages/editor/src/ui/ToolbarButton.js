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

// eslint-disable-next-line
export default function ToolbarButton({
  as: Button = StyledToolbarButton,
  onMouseDown,
  ...props
}) {
  return (
    <Button
      as={StyledToolbarButton}
      {...props}
      onMouseDown={useAutoCallback((event) => {
        event.preventDefault();
        onMouseDown && onMouseDown(event);
      })}
    />
  );
}

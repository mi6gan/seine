// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { Button as MuiButton } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';
import { palette, color, borders } from '@material-ui/system';

const StyledToolbarButton = styled(MuiButton).attrs(
  ({ color = 'inherit' }) => ({
    color,
  })
)`
  && {
    ${color};
    ${palette};
    ${borders};
    min-width: 0;
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
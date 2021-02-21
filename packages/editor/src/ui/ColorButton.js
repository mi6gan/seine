// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import SketchPicker from 'react-color/lib/Sketch';
import { useAutoCallback } from 'hooks.macro';

import { SidebarGroup, SidebarLabel } from '../ui';

import {
  Button,
  ClickAwayListener,
  Checkbox,
} from '@seine/styles/mui-core.macro';

const StyledColorButton = styled(Button).attrs(({ children = '' }) => ({
  children,
  variant: 'contained',
}))`
  &&& {
    background-color: ${({ bgcolor }) => bgcolor};
    min-width: 0;
    width: 2rem;
  ${({ theme }) =>
    css`
      height: ${theme.spacing(4)}px;
    `}
`;

const ColorPickerContainer = styled.div`
  margin-right: -250px;
  margin-top: 50px;
  position: absolute;
  z-index: 9999;
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`;

// eslint-disable-next-line
const ColorButton = React.forwardRef(function ColorButton(
  { onChange = null, value = null, label = 'color', ...props },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  return (
    <SidebarGroup ref={ref}>
      <SidebarLabel component={'label'}>
        <Checkbox
          color={'primary'}
          checked={value !== null}
          onChange={useAutoCallback((_, checked) => {
            onChange({ target: { value: checked ? 'rgba(0,0,0,1.0)' : null } });
          })}
        />
        {label}
      </SidebarLabel>
      <StyledColorButton
        ref={buttonRef}
        bgcolor={value}
        onClick={useAutoCallback(() => {
          setOpen(!open);
        })}
        size={'small'}
        disabled={value === null}
        {...props}
      />
      <ClickAwayListener
        onClickAway={(event) => {
          if (
            !buttonRef.current ||
            (event.target !== buttonRef.current &&
              !buttonRef.current.contains(event.target))
          ) {
            setOpen(false);
          }
        }}
      >
        <ColorPickerContainer
          open={open}
          onClick={useAutoCallback((event) => {
            event.preventDefault();
            event.stopPropagation();
          })}
        >
          <SketchPicker
            color={value || 'rgba(0,0,0,1.0)'}
            onChange={useAutoCallback(({ rgb: { r, g, b, a = 1 } }) => {
              onChange &&
                onChange({ target: { value: `rgba(${r},${g},${b},${a})` } });
            })}
          />
        </ColorPickerContainer>
      </ClickAwayListener>
    </SidebarGroup>
  );
});

export default ColorButton;

// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import SketchPicker from 'react-color/lib/Sketch';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch } from '../blocks';
import { SidebarGroup, SidebarLabel } from '../ui';
import { useSelectedLayoutItems } from '../layouts';

import { Button, ClickAwayListener } from '@seine/styles/mui-core.macro';
import { chartPaletteKeyValues, UPDATE_BLOCK_FORMAT } from '@seine/core';

const StyledColorButton = styled(Button).attrs(({ children = '' }) => ({
  children,
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
const ChartElementColorButton = React.forwardRef(
  function ChartElementColorButton({ onChange = null, props }, ref) {
    const {
      item: {
        id,
        editor: { rowIndex: colorIndex = null } = {},
        format: { paletteKey, palette },
      },
    } = useSelectedLayoutItems();
    const dispatch = useBlocksDispatch();
    const [open, setOpen] = React.useState(false);
    const color = colorIndex > -1 ? palette[colorIndex % palette.length] : null;
    const buttonRef = React.useRef(null);
    return (
      <SidebarGroup display={color ? 'flex' : 'none'} ref={ref}>
        <SidebarLabel>color</SidebarLabel>
        <StyledColorButton
          ref={buttonRef}
          bgcolor={color}
          onClick={useAutoCallback(() => {
            setOpen(!open);
          })}
          size={'small'}
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
              color={color}
              presetColors={chartPaletteKeyValues[paletteKey]}
              onChange={useAutoCallback(({ rgb: { r, g, b, a = 1 } }) => {
                const value = `rgba(${r},${g},${b},${a})`;
                dispatch({
                  id,
                  type: UPDATE_BLOCK_FORMAT,
                  format: {
                    palette: [
                      ...palette.slice(0, colorIndex),
                      value,
                      ...palette.slice(colorIndex + 1),
                    ],
                  },
                });
                onChange && onChange({ target: { value, setOpen } });
              })}
            />
          </ColorPickerContainer>
        </ClickAwayListener>
      </SidebarGroup>
    );
  }
);

export default ChartElementColorButton;

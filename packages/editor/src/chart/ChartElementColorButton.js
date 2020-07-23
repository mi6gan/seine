// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import SketchPicker from 'react-color/lib/Sketch';
import { Button, ClickAwayListener } from '@material-ui/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { chartPaletteKeyValues } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch } from '../store';
import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';

import useChartBlock from './useChartBlock';

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
export default function ChartElementColorButton() {
  const {
    id,
    editor: { selection },
    format: { paletteKey, palette },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  const [open, setOpen] = React.useState(false);
  const colorIndex = selection % palette.length;
  const color = palette[colorIndex];
  const buttonRef = React.useRef(null);
  return (
    <SidebarGroup alignItems={'center'}>
      <SidebarLabel>color</SidebarLabel>
      <StyledColorButton
        ref={buttonRef}
        bgcolor={color}
        onClick={useAutoCallback(() => {
          setOpen(!open);
        })}
        size={'small'}
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
            onChange={useAutoCallback(({ rgb: { r, g, b, a = 1 } }) =>
              dispatch({
                id,
                type: UPDATE_BLOCK_FORMAT,
                format: {
                  palette: [
                    ...palette.slice(0, colorIndex),
                    `rgba(${r},${g},${b},${a})`,
                    ...palette.slice(colorIndex + 1),
                  ],
                },
              })
            )}
          />
        </ColorPickerContainer>
      </ClickAwayListener>
    </SidebarGroup>
  );
}

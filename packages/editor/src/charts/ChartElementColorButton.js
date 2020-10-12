// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import SketchPicker from 'react-color/lib/Sketch';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import { Button, ClickAwayListener } from '../../mui-core.macro';
import { useBlocksDispatch } from '../contexts';
import { SidebarGroup, SidebarLabel } from '../ui';

import useChartBlock from './useChartBlock';

import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { chartPaletteKeyValues, groupElements } from '@seine/content';

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
    body: { elements },
  } = useChartBlock();
  const colorIndex = useAutoMemo(
    groupElements(elements).reduce(
      (acc, [_, group]) =>
        acc === -1
          ? group.findIndex(({ index }) => index === selection) % palette.length
          : acc,
      -1
    )
  );
  const dispatch = useBlocksDispatch();
  const [open, setOpen] = React.useState(false);
  const color = palette[colorIndex];
  const buttonRef = React.useRef(null);
  return (
    <SidebarGroup
      alignItems={'center'}
      display={selection > -1 ? 'flex' : 'none'}
    >
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
            onChange={useAutoCallback(({ rgb: { r, g, b, a = 1 } }) => {
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
              });
            })}
          />
        </ColorPickerContainer>
      </ClickAwayListener>
    </SidebarGroup>
  );
}

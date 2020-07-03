// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { SketchPicker } from 'react-color.macro';
import { Button } from '@material-ui/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import {
  chartPaletteKeyValues,
  defaultChartEditor,
  defaultChartFormat,
  defaultChartPaletteKey,
} from '@seine/contents';
import { useAutoCallback } from 'hooks.macro';

const StyledColorButton = styled(Button).attrs(({ children = '' }) => ({
  children,
}))`
  &&& {
    background-color: ${({ bgcolor }) => bgcolor};
  ${({ theme }) =>
    css`
      height: ${theme.spacing(4)}px;
    `}
`;

const ColorPickerContainer = styled.div`
  margin-right: -250px;
  margin-top: 50px;
  position: absolute;
  z-index: 999;
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`;

// eslint-disable-next-line
export default function ChartElementColorButton({
  dispatch,
  editor: { selection = defaultChartEditor.selection } = defaultChartEditor,
  format: {
    palette = defaultChartFormat.palette,
    paletteKey = defaultChartPaletteKey,
  } = defaultChartFormat,
}) {
  const [open, setOpen] = React.useState(false);
  const colorIndex = selection % palette.length;
  const color = palette[colorIndex];
  return (
    <div>
      <StyledColorButton
        bgcolor={color}
        onClick={useAutoCallback(() => {
          setOpen(!open);
        })}
        size={'small'}
      />
      <ColorPickerContainer
        open={open}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        <SketchPicker
          color={color}
          presetColors={chartPaletteKeyValues[paletteKey]}
          onChange={useAutoCallback(
            ({ rgb: { r, g, b, a = 1 } }) =>
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: {
                  palette: [
                    ...palette.slice(0, colorIndex),
                    `rgba(${r},${g},${b},${a})`,
                    ...palette.slice(colorIndex + 1),
                  ],
                },
              }),
            [colorIndex, dispatch, palette]
          )}
        />
      </ColorPickerContainer>
    </div>
  );
}

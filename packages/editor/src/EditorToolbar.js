// @flow
import * as React from 'react';
import type { BoxProps } from '@material-ui/core';
import { Box, MenuItem, Select } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { ItemMenuContext } from './EditorItemMenu';
import { deviceSelector } from './selectors';
import Toolbar from './ui/Toolbar';
import ToolbarButton from './ui/ToolbarButton';
import ToolbarSeparator from './ui/ToolbarSeparator';
import RichTextIconButton from './richtext/RichTextIconButton';
import TableIconButton from './table/TableIconButton';
import BarChartIconButton from './chart/BarChartIconButton';
import LineChartIconButton from './chart/LineChartIconButton';
import ColumnChartIconButton from './chart/ColumnChartIconButton';
import PieChartIconButton from './chart/PieChartIconButton';
import { useBlocksDispatch, useBlocksSelector } from './context';

import { SET_DEVICE } from '@seine/core';

const StyledSelect = styled(Select)`
  && {
    color: ${({ theme }) => theme.palette.grey[50]}};
  }
`;
type Props = BoxProps;

/**
 * @description Default content editor.
 * @param {Props} boxProps
 * @returns {React.Node}
 */
export default function EditorToolbar(boxProps: Props) {
  const menuAnchorRef = React.useRef(null);
  const itemMenu = React.useContext(ItemMenuContext);

  const dispatch = useBlocksDispatch();
  const device = useBlocksSelector(deviceSelector);

  return (
    <Toolbar {...boxProps} ref={menuAnchorRef}>
      <Box width={'40%'}>
        <ToolbarButton
          onClick={useAutoCallback(() => {
            if (itemMenu) {
              itemMenu.open(menuAnchorRef.current);
            }
          })}
          selected={itemMenu.isOpen}
        >
          <MenuIcon />
        </ToolbarButton>
        <ToolbarSeparator />

        <RichTextIconButton />
        <ToolbarSeparator />

        <TableIconButton />
        <ToolbarSeparator />

        <BarChartIconButton />
        <LineChartIconButton />
        <ColumnChartIconButton />
        <PieChartIconButton />
      </Box>
      <Box width={'20%'} textAlign={'center'}>
        <StyledSelect
          value={device}
          onChange={useAutoCallback((event) =>
            dispatch({ type: SET_DEVICE, device: event.target.value })
          )}
        >
          <MenuItem value={'any'}>Any device</MenuItem>
          <MenuItem value={'mobile'}>Mobile only</MenuItem>
        </StyledSelect>
      </Box>
      <Box width={'40%'} />
    </Toolbar>
  );
}

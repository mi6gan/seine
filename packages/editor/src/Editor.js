// @flow
import * as React from 'react';
import { Box, Button, Menu, MenuItem } from '@material-ui/core';
import { GridOnSharp as GridIcon, Menu as MenuIcon } from '@material-ui/icons';
import { ThemeProvider } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import defaultTheme from './defaultTheme';

const ToolbarButton = styled(Button).attrs(() => ({
  color: 'inherit',
}))`
  && {
    ${({ selected, theme }) =>
      selected && { backgroundColor: theme.palette.grey[800] }};
  }
`;

const Toolbar = styled(Box).attrs({
  bgcolor: 'grey.700',
  color: 'grey.50',
  width: '100%',
})`
  ${ToolbarButton} {
    border-radius: 0;
    min-width: 0;
  }
`;

const StyledMenu = styled(Box).attrs({ component: Menu })`
  .MuiMenu-paper {
    color: ${({ theme }) => theme.palette.grey[50]};
    background-color: ${({ theme }) => theme.palette.grey[700]};
    min-width: 10em;
  }
`;

const Content = styled(Box).attrs({
  minHeight: 480,
  width: '80%',
})`
  ${({ cursor }) => cursor && { cursor }};
`;

const Sidebar = styled(Box).attrs({
  bgcolor: 'grey.100',
  color: 'grey.700',
  minWidth: 150,
  minHeight: 480,
  square: true,
})``;

/**
 * @description Default content editor.
 * @returns {React.Node}
 */
export default function Editor() {
  const [tool, setTool] = React.useState(null);
  const closeMenu = useAutoCallback(() => setTool(null));

  const menuAnchorRef = React.useRef(null);
  const gridIconRef = React.useRef(null);

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledMenu
        open={tool === 'menu'}
        onClose={closeMenu}
        anchorEl={menuAnchorRef.current}
        keepMounted
        mt={6}
      >
        <MenuItem onClick={closeMenu}>Copy</MenuItem>
        <MenuItem onClick={closeMenu}>Undo</MenuItem>
        <MenuItem onClick={closeMenu}>Redo</MenuItem>
      </StyledMenu>

      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        bgcolor={'grey.300'}
      >
        <Toolbar>
          <ToolbarButton
            aria-label={'menu'}
            onClick={useAutoCallback(() => setTool('menu'))}
            selected={tool === 'menu'}
            ref={menuAnchorRef}
          >
            <MenuIcon />
          </ToolbarButton>

          <ToolbarButton
            aria-label={'grid'}
            onClick={useAutoCallback(() => setTool('grid'))}
            selected={tool === 'grid'}
            title={'Grid tool'}
          >
            <GridIcon
              ref={gridIconRef}
              fill={'white'}
              width={24}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
            />
          </ToolbarButton>
        </Toolbar>

        <Content
          cursor={
            tool === 'grid' &&
            `url(data:image/svg+xml;base64,${btoa(
              gridIconRef.current.outerHTML
            )}), auto`
          }
        />
        <Sidebar>&nbsp;</Sidebar>
      </Box>
    </ThemeProvider>
  );
}

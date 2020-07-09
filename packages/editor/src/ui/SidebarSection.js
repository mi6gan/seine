// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';

type Props = {
  children: React.Node,
};

/**
 * @description Sidebar group heading text.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SidebarSection({ children, py = 1, ...boxProps }) {
  return (
    <Box {...boxProps} py={py}>
      {children}
    </Box>
  );
}

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
export default function SidebarHeading({ children, ...boxProps }) {
  return (
    <Box color={'text.primary'} mb={2} component={'p'} {...boxProps}>
      <b>{children}</b>
    </Box>
  );
}

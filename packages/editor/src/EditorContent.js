// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Box } from '@seine/styles/mui-core.macro';
import { Content } from '@seine/content';

const EditorContent = styled(
  React.forwardRef(({ children, device, blockRenderMap, ...boxProps }, ref) => (
    <Box {...boxProps} ref={ref}>
      <Content device={device} blockRenderMap={blockRenderMap}>
        {children}
      </Content>
    </Box>
  ))
).attrs({
  minHeight: 600,
  alignSelf: 'center',
  display: 'flex',
  p: 4,
})`
  overflow: auto;
  ${({ device, theme }) => ({
    width:
      device === 'mobile'
        ? theme.breakpoints.width('sm')
        : device === 'tablet'
        ? theme.breakpoints.width('lg')
        : '100%',
    maxWidth: theme.breakpoints.width('xl'),
    minWidth:
      device === 'mobile'
        ? theme.breakpoints.width('sm')
        : device === 'tablet'
        ? theme.breakpoints.width('md')
        : theme.breakpoints.width('lg'),
  })}
`;

export default EditorContent;

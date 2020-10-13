// @flow
import styled from 'styled-components/macro';

import { Box } from '@seine/styles/mui-core.macro';

const ToolbarSeparator = styled(Box).attrs({
  height: '1em',
  width: '2px',
  position: 'relative',
  top: '0.25em',
  color: 'grey.500',
  bgcolor: 'grey.800',
  borderLeft: '1px solid currentColor',
  display: 'inline-block',
})``;

export default ToolbarSeparator;

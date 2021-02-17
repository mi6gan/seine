// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Frame } from '../ui';

import { Box } from '@seine/styles';

const StyledRect = styled(Box).attrs(({ borderColor, border }) => ({
  as: 'rect',
  stroke: borderColor,
  strokeWidth: border,
}))``;

// eslint-disable-next-line
const ShapeFrame = React.forwardRef(function ShapeFrame(props, ref) {
  return <Frame {...props} as={StyledRect} ref={ref} />;
});

export default ShapeFrame;

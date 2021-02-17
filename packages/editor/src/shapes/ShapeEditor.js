// @flow
import * as React from 'react';

import { Frame } from '../ui';

import ShapeFrame from './ShapeFrame';

import { Shape } from '@seine/content';
import { shapeTypes } from '@seine/core';

// eslint-disable-next-line
const ShapeEditor = React.forwardRef(function ShapeEditor(props, ref) {
  return props.kind === shapeTypes.ROOT ? (
    <Frame {...props} as={Shape} ref={ref} />
  ) : (
    <ShapeFrame {...props} ref={ref} />
  );
});

export default ShapeEditor;

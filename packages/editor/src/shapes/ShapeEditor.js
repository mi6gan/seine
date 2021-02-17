// @flow
import * as React from 'react';

import { Frame } from '../ui';

import EllipseShapeEditor from './EllipseShapeEditor';
import RectShapeEditor from './RectShapeEditor';

import { Shape } from '@seine/content';
import { shapeTypes } from '@seine/core';

// eslint-disable-next-line
const ShapeEditor = React.forwardRef(function ShapeEditor(props, ref) {
  return props.kind === shapeTypes.ROOT ? (
    <Frame {...props} as={Shape} ref={ref} />
  ) : props.kind === shapeTypes.ELLIPSE ? (
    <EllipseShapeEditor {...props} ref={ref} />
  ) : props.kind === shapeTypes.RECT ? (
    <RectShapeEditor {...props} ref={ref} />
  ) : null;
});

export default ShapeEditor;

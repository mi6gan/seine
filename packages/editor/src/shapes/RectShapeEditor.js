// @flow
import * as React from 'react';

import ShapeFrame from './ShapeFrame';

import { Shape } from '@seine/content';

const EllipseShapeEditor = React.forwardRef(function ShapeEditor(props, ref) {
  const { x, y, width, height } = props;
  return (
    <>
      <Shape {...props} />
      <ShapeFrame
        {...props}
        x={x}
        y={y}
        width={width}
        height={height}
        ref={ref}
      />
    </>
  );
});

export default EllipseShapeEditor;

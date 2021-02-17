// @flow
import * as React from 'react';

import ShapeFrame from './ShapeFrame';

import { Shape } from '@seine/content';

const EllipseShapeEditor = React.forwardRef(function ShapeEditor(props, ref) {
  const { cx, cy, rx, ry } = props;
  return (
    <>
      <Shape {...props} />
      <ShapeFrame
        {...props}
        x={cx - rx}
        y={cy - ry}
        width={2 * rx}
        height={2 * ry}
        ref={ref}
      />
    </>
  );
});

export default EllipseShapeEditor;

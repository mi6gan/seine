// @flow
import * as React from 'react';

// eslint-disable-next-line
const EllipseShape = React.forwardRef(function EllipseShape(
  { cx, cy, rx, ry },
  ref
) {
  return (
    <ellipse
      shapeRendering={'geometricPrecision'}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      ref={ref}
    />
  );
});

export default EllipseShape;

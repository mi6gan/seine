// @flow
import * as React from 'react';

const ReactShape = React.forwardRef(function RectShape(
  { x, y, width, height },
  ref
) {
  return (
    <rect
      shapeRendering={'crispEdges'}
      x={x}
      y={y}
      width={width}
      height={height}
      ref={ref}
    />
  );
});

export default ReactShape;

// @flow
import * as React from 'react';

// eslint-disable-next-line
const EllipseShape = React.forwardRef(function EllipseShape(props, ref) {
  return <ellipse {...props} ref={ref} />;
});

export default EllipseShape;

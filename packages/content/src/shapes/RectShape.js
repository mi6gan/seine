// @flow
import * as React from 'react';

const ReactShape = React.forwardRef(function RectShape(props, ref) {
  return <rect {...props} ref={ref} />;
});

export default ReactShape;

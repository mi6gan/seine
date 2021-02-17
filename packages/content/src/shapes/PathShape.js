// @flow
import * as React from 'react';

// eslint-disable-next-line
const PathShape = React.forwardRef(function PathShape(props, ref) {
  return <path {...props} ref={ref} />;
});

export default PathShape;

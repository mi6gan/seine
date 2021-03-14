// @flow
import * as React from 'react';

// eslint-disable-next-line
const PathShape = React.forwardRef(function PathShape({ d }, ref) {
  return <path d={d} ref={ref} />;
});

export default PathShape;

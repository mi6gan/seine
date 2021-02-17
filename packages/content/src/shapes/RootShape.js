// @flow
import * as React from 'react';

const RootShape = React.forwardRef(function RootShape(props, ref) {
  return <svg {...props} ref={ref} />;
});

export default RootShape;

// @flow
import * as React from 'react';

const GroupShape = React.forwardRef(function GroupShape(props, ref) {
  return <g {...props} ref={ref} />;
});

export default GroupShape;

// @flow
import * as React from 'react';

import useElementOnlyProps from '../useElementOnlyProps';

import { defaultItemFormat } from '@seine/core';

const GroupShape = React.forwardRef(function GroupShape(
  { children, ...props },
  ref
) {
  return (
    <g ref={ref} {...useElementOnlyProps(props, defaultItemFormat)}>
      {children}
    </g>
  );
});

export default GroupShape;

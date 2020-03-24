// @flow
import * as React from 'react';

const ResizeObserverContext = React.createContext<{
  count: number,
  observer?: ResizeObserver,
}>({ count: 0 });

export default ResizeObserverContext;

// @flow
import * as React from 'react';

export type ResizeObserverType = {
  lastResizeTime: number,
  isResizing: boolean,
  observer?: ResizeObserver,
};

const ResizeObserverContext = React.createContext<ResizeObserverType>({
  count: 0,
  lastResizeTime: new Date(),
  isResizing: false,
});

export default ResizeObserverContext;

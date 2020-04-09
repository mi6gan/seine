// @flow
import * as React from 'react';

export type ResizeObserverType = {
  observer?: ResizeObserver,
  count?: number,
};

const ResizeObserverContext = React.createContext<ResizeObserverType>({
  observer: null,
  count: 0,
});

export default ResizeObserverContext;

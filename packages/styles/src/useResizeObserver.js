// @flow
import * as React from 'react';

import ResizeObserverContext from './ResizeObserverContext';
import type { ResizeObserverType } from './ResizeObserverContext';

/**
 * @description Use current resize observer context.
 * @returns {ResizeObserverType}
 */
export default function useResizeObserver(): ResizeObserverType {
  return React.useContext(ResizeObserverContext);
}

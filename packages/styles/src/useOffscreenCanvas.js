// @flow
import * as React from 'react';

import OffscreenCanvasContext from './OffscreenCanvasContext';

/**
 * @description Use offscreen canvas of current context.
 * @returns {HTMLCanvasElement}
 */
export default function useOffscreenCanvas() {
  return React.useContext(OffscreenCanvasContext);
}

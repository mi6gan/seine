// @flow
import * as React from 'react';

export const defaultOffscreenCanvas = {
  getContext: (_: '2d') => ({
    measureText: (text: string) => ({
      width: (text.length * 16) / 2,
    }),
  }),
};

const OffscreenCanvasContext = React.createContext<HTMLCanvasElement>(
  defaultOffscreenCanvas
);

export default OffscreenCanvasContext;

// @flow
import * as React from 'react';
import { Grid } from '@seine/content';

import Frame from '../ui/Frame';

/**
 * @description Grid layout editor.
 * @param {any} props
 * @returns {React.Node}
 */
export default function GridEditor({ children, ...grid }) {
  return (
    <Frame {...grid} as={Grid}>
      {children}
    </Frame>
  );
}

// @flow
import * as React from 'react';
import { Layout } from '@seine/content';

import Frame from '../ui/Frame';

/**
 * @description Grid layout editor.
 * @param {any} props
 * @returns {React.Node}
 */
export default function LayoutEditor({ children, ...grid }) {
  return (
    <Frame {...grid} as={Layout}>
      {children}
    </Frame>
  );
}

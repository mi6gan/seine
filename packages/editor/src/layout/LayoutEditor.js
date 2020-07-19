// @flow
import * as React from 'react';
import { Layout } from '@seine/content';

import Frame from '../ui/Frame';

/**
 * @description Layout editor.
 * @param {any} props
 * @returns {React.Node}
 */
export default function LayoutEditor({ children, ...frameProps }) {
  return (
    <Frame {...frameProps} as={Layout}>
      {children}
    </Frame>
  );
}

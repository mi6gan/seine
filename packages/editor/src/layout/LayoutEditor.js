// @flow
import * as React from 'react';

import Frame from '../ui/Frame';

import { Layout } from '@seine/content';

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

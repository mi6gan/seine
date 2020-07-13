// @flow
import * as React from 'react';
import { Flex } from '@seine/content';

import Frame from '../ui/Frame';

/**
 * @description Flex layout editor.
 * @param {any} props
 * @returns {React.Node}
 */
export default function FlexEditor({ children, ...flex }) {
  return (
    <Frame {...flex} as={Flex}>
      {children}
    </Frame>
  );
}

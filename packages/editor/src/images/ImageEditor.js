// @flow
import * as React from 'react';

import type { ImageProps } from '@seine/content';
import { Image } from '@seine/content';
import { Frame } from '@seine/editor';

type Props = ImageProps & {
  onChange: (SyntheticInputEvent) => any,
};

/**
 * @description Image block default editor render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ImageEditor(props: Props) {
  return <Frame {...props} as={Image} />;
}

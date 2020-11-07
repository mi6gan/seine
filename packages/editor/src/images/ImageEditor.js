// @flow
import * as React from 'react';

import { Frame } from '../ui';

import type { ImageProps } from '@seine/content';
import { Image } from '@seine/content';

type Props = ImageProps & {
  onChange: (SyntheticInputEvent) => any,
};

/**
 * @description Image block default editor render component.
 * @param {Props} props
 * @returns {React.Node}
 */
const ImageEditor = React.forwardRef(function ImageEditor(props: Props, ref) {
  return <Frame {...props} as={Image} ref={ref} />;
});

export default ImageEditor;

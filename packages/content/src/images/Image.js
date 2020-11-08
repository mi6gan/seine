// @flow
import * as React from 'react';

import { Item } from '../layouts';

import type { ImageBody, ImageFormat } from '@seine/core';
import { defaultImageBody, defaultImageFormat } from '@seine/core';

export type Props = ImageBody & ImageFormat & $Shape<HTMLImageElement>;

/**
 * @description Image block default render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Image({ file, as = Item, ...imgProps }: Props) {
  return (
    <Item
      {...defaultImageFormat}
      {...defaultImageBody}
      {...imgProps}
      src={file}
      as={as}
      forwardedAs={'img'}
    />
  );
}

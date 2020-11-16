// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Item } from '../layouts';

import type { ImageBody, ImageFormat } from '@seine/core';
import { defaultImageBody, defaultImageFormat } from '@seine/core';

export type Props = ImageBody & ImageFormat & $Shape<HTMLImageElement>;

const StyledItem = styled(Item)`
  display: block;
  width: initial;
`;

/**
 * @description Image block default render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Image({ file, as = Item, ...imgProps }: Props) {
  return (
    <StyledItem
      {...defaultImageFormat}
      {...defaultImageBody}
      {...imgProps}
      src={file}
      as={as}
      forwardedAs={'img'}
    />
  );
}

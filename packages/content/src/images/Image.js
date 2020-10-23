// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import type { ImageBody, ImageFormat } from '@seine/core';
import { Item } from '@seine/content';
import { defaultImageBody, defaultImageFormat } from '@seine/core';

export type Props = ImageBody & ImageFormat & $Shape<HTMLImageElement>;

export const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  & > img {
    @media (min-width: 1280px) {
      ${({ hasSibling = false }) => !hasSibling && { padding: '10%' }}
    }
  }
`;

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

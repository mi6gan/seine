// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Item } from '../layouts';

import type { ImageBody, ImageFormat } from '@seine/core';

export type Props = ImageBody & ImageFormat & $Shape<HTMLImageElement>;

const StyledItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`;

/**
 * @description Image block default render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Image({ file, as = Item, alt, ...itemProps }: Props) {
  return (
    <StyledItem as={as} {...itemProps}>
      <img src={file} alt={alt} />
    </StyledItem>
  );
}

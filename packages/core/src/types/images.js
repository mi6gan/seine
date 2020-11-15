// @flow

import type { ItemFormat } from './layout';

export type ImageBody = {
  alt: string,
  title: string,
  file: string,
};

export type ImageFormat = ItemFormat & {
  align: 'top' | 'bottom' | 'middle' | 'left' | 'right',
};

export const defaultImageFormat = {};

export const defaultImageBody = {};

export const Images = 'image';

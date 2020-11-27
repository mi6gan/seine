// @flow

import type { ItemFormat } from './layout';
import { defaultItemFormat } from './layout';

export type ImageBody = {
  alt: string,
  title: string,
  file: string,
};

export type ImageFormat = ItemFormat & {
  align: 'top' | 'bottom' | 'middle' | 'left' | 'right',
};

export const defaultImageFormat = {
  ...defaultItemFormat,
};

export const defaultImageBody = {};

export const Images = 'image';

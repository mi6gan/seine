// @flow

export type ImageBody = {
  alt: string,
  title: string,
  file: string,
};

export type ImageFormat = {
  align: 'top' | 'bottom' | 'middle' | 'left' | 'right',
};

export const defaultImageFormat = {};

export const defaultImageBody = {};

export const IMAGE = 'image';

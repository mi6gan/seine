// @flow
import type { ItemFormat, LayoutFormat } from './layout';
import { defaultLayoutFormat } from './layout';

export type PageBody = {};

export type PageFormat = (LayoutFormat & ItemFormat) & {
  scale: number | 'auto',
};

export const defaultPageFormat = {
  ...defaultLayoutFormat,
  spacing: 0,
  columnGap: 0,
  rowGap: 0,
  minWidth: '100%',
  maxWidth: '100%',
  maxHeight: 'none',
  minHeight: 'auto',
};

export const PAGE = 'page';

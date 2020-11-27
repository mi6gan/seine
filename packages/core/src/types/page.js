// @flow
import type { ItemFormat, LayoutFormat } from './layout';
import { defaultFlexFormat, defaultGridFormat } from './layout';

export type PageBody = {};

export type PageFormat = (LayoutFormat & ItemFormat) & {
  scale: number | 'auto',
};

export const defaultPageFormat = {
  ...defaultGridFormat,
  ...defaultFlexFormat,
  spacing: 0,
  columnGap: 0,
  rowGap: 0,
  minWidth: '100%',
  maxWidth: '100%',
  maxHeight: 'none',
  minHeight: '100%',
};

export const PAGE = 'page';

// @flow
import type { ItemFormat, LayoutFormat } from './layout';
import { layoutTypes } from './layout';

export type PageBody = {};

export type PageFormat = (LayoutFormat & ItemFormat) & {
  scale: number | 'auto',
};

export const defaultPageFormat = {
  kind: layoutTypes.FLEX,
  direction: 'row',
  wrap: 'nowrap',
  spacing: 0,
  justify: 'normal',
  alignItems: 'normal',
  alignContent: 'normal',
  minWidth: '100%',
  maxWidth: '100%',
  maxHeight: 'none',
  minHeight: 0,
};

export const PAGE = 'page';

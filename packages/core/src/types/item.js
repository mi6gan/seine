// @flow
export type ItemBody = {};

export type LayoutType = 'none' | 'grid' | 'flex';

export type ItemFormat = {
  layout: LayoutType,
  alignSelf: 'normal' | 'center' | 'start' | 'end' | 'stretch',
  maxWidth: 'none' | string | number,
  minWidth: 0 | string | number,
  flexGrow: number,
  flexBasis: 'auto' | string | number,
  gridRow: string,
  gridColumn: string,
};

export const defaultItemFormat = {
  layout: 'flex',
  alignSelf: 'auto',
  maxWidth: 'none',
  minWidth: 0,
  flexGrow: 0,
  flexBasis: 'auto',
  gridRow: '',
  gridColumn: '',
};

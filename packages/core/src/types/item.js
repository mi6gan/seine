// @flow
import type { LayoutType } from './layout';

export type ItemBody = {};

export type ItemFormat = {
  layout: LayoutType,
  alignSelf:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  justifySelf: 'normal' | 'center' | 'flex-start' | 'flex-end' | 'stretch',
  maxWidth: 'none' | string | number,
  minWidth: 0 | string | number,
  maxHeight: 'none' | string | number,
  minHeight: 0 | string | number,
  flexGrow: number,
  flexBasis: 'auto' | string | number,
  gridRow: string,
  gridColumn: string,
};

export const defaultItemFormat = {
  alignSelf: 'auto',
  justifySelf: 'auto',
  maxWidth: 'none',
  minWidth: 0,
  maxHeight: 'none',
  minHeight: 0,
  flexGrow: 0,
  flexBasis: 'auto',
  gridRow: '',
  gridColumn: '',
};

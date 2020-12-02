// @flow
export const layoutTypes = {
  FLEX: 'flex',
  GRID: 'grid',
};

export type LayoutType = $Values<typeof layoutTypes>;

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
  parentType: null,
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
  version: '0.4',
  whiteSpace: null,
};

export type GridBody = {};

export type GridFormat = ItemFormat & {
  kind: 'grid',
  columns?: string,
  columnGap?: string,
  rows?: string,
  rowGap?: string,
};

export type FlexBody = {};

export type FlexFormat = ItemFormat & {
  kind: 'flex',
  direction: 'row' | 'column',
  wrap: 'wrap' | 'nowrap',
  spacing: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
  justify:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
  alignContent:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around',
};

export const defaultFlexFormat = {
  ...defaultItemFormat,
  kind: layoutTypes.FLEX,
  direction: 'row',
  wrap: 'nowrap',
  spacing: 2,
  justify: 'normal',
  alignItems: 'normal',
  alignContent: 'normal',
};

export const defaultGridFormat = {
  ...defaultItemFormat,
  kind: layoutTypes.GRID,
  columns: 'repeat(auto-fit,minmax(25ch,1fr))',
  columnGap: 2,
  rowGap: 2,
  rows: 'auto',
  justify: 'auto',
  alignItems: 'auto',
};

export const defaultLayoutFormat = defaultGridFormat;

export type LayoutFormat = FlexFormat | GridFormat;
export type LayoutBody = FlexBody | GridBody;

export const LAYOUT = 'grid';

// @flow
export const layoutTypes = {
  FLEX: 'flex',
  GRID: 'grid',
};

export type LayoutType = $Values<typeof layoutTypes>;

export type GridBody = {};

export type GridFormat = {
  columns?: string,
  columnGap?: string,
  rows?: string,
  rowGap?: string,
};

export type FlexBody = {};

export type FlexFormat = {
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
  kind: layoutTypes.FLEX,
  direction: 'row',
  wrap: 'nowrap',
  spacing: 8,
  justify: 'normal',
  alignItems: 'normal',
  alignContent: 'normal',
};

export const defaultLayoutFormat = {
  kind: layoutTypes.GRID,
};

export type LayoutFormat =
  | { kind: typeof layoutTypes.FLEX, ...FlexFormat }
  | { kind: typeof layoutTypes.GRID, ...GridFormat };
export type LayoutBody = FlexBody | GridBody;

export const LAYOUT = 'grid';

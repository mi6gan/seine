// @flow
export type TableCell = {
  text: React$Node,
  align?: 'left' | 'center' | 'right',
  bold?: boolean,
  italic?: boolean,
};

export type TableHeaderCell = TableCell & {
  width?: number,
};

export type TableBody = {
  title?: string,
  header: TableHeaderCell[],
  rows: TableCell[][],
};

export type TableFormat = {};

export const TABLE = 'table';

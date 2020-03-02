// @flow
export type TableCell = {
  text: React$Node,
  align?: 'left' | 'center' | 'right',
  bold?: boolean,
  italic?: boolean,
};

export type TableBody = {
  title?: string,
  header: TableCell[],
  rows: TableCell[][],
};

export type TableFormat = {};

export const TABLE = 'table';

// @flow
import type { ItemFormat } from './layout';
import type { RichTextBody } from './richText';
import { defaultItemFormat } from './layout';

export type TableCell = {
  text: RichTextBody,
  value?: number,
  align?: 'left' | 'center' | 'right',
  bold?: boolean,
  italic?: boolean,
};

export type TableHeaderCell = TableCell & {
  width?: number,
};

export type TableBody = {
  header: TableHeaderCell[],
  rows: TableCell[][],
};

export type TableFormat = ItemFormat;

export const TABLE = 'table';

export const defaultTableBody = {
  header: [],
  rows: [],
};

export const defaultTableFormat = defaultItemFormat;

export const defaultTableCell = {
  text: '',
};

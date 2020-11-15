// @flow
import type { ItemFormat } from './layout';

import type { RichTextBody } from '@seine/core';

export type TableCell = {
  text: RichTextBody,
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

export const defaultTableFormat = {};

export const defaultTableCell = {
  text: '',
};

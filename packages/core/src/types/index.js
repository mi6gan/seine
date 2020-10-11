// @flow

import type { ChartBody, ChartElement, ChartFormat } from './charts';
import { CHART } from './charts';
import type { RichTextBody, RichTextFormat } from './richText';
import { RICH_TEXT } from './richText';
import type { ImageBody, ImageFormat } from './image';
import { IMAGE } from './image';
import type { PageBody, PageFormat } from './page';
import { PAGE } from './page';
import type { TableBody, TableFormat } from './tables';
import { TABLE } from './tables';
import type { ItemBody, ItemFormat } from './item';
import type { LayoutBody, LayoutFormat } from './layout';
import { LAYOUT } from './layout';

import type { BlocksAction } from '@seine/core';

export * from './item';
export * from './charts';
export * from './richText';
export * from './layout';
export * from './image';
export * from './page';
export * from './tables';

export const blockTypes = {
  CHART,
  RICH_TEXT,
  IMAGE,
  PAGE,
  TABLE,
  LAYOUT,
};

export type BlockElement = ChartElement;

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody = ItemBody &
  (ChartBody | RichTextBody | ImageBody | PageBody | TableBody | LayoutBody);

export type BlockFormat = ItemFormat &
  (
    | ChartFormat
    | RichTextFormat
    | ImageFormat
    | PageFormat
    | TableFormat
    | LayoutFormat
  );

export type BlockId = string | null;

export type Block = {
  id: BlockId,
  body: BlockBody,
  format: BlockFormat,
  parent_id: BlockId,
  type: BlockType,
};

export type BlockEditor = {
  dispatch: (BlocksAction) => any,
  editor?: { [string]: any },
  selection: BlockId[],
};

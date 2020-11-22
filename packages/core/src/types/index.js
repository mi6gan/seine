// @flow

import type { BlocksAction } from '../reducers';

import type { ChartBody, ChartElement, ChartFormat } from './charts';
import { CHART } from './charts';
import type { RichTextBody, RichTextFormat } from './richText';
import { RICH_TEXT } from './richText';
import type { ImageBody, ImageFormat } from './images';
import { Images } from './images';
import type { PageBody, PageFormat } from './page';
import { PAGE } from './page';
import type { TableBody, TableFormat } from './tables';
import { TABLE } from './tables';
import type { ItemBody, LayoutBody, LayoutFormat } from './layout';
import { LAYOUT } from './layout';

export * from './charts';
export * from './richText';
export * from './layout';
export * from './images';
export * from './page';
export * from './tables';

export * from './v0.3';

export const blockTypes = {
  CHART,
  IMAGE: Images,
  LAYOUT,
  PAGE,
  RICH_TEXT,
  TABLE,
};

export const defaultBlockFormat = {};
export const defaultBlockBody = {};

export type ScreenDevice = 'any' | 'mobile' | 'tablet' | 'desktop';

export type BlockElement = ChartElement;

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody = ItemBody &
  (ChartBody | RichTextBody | ImageBody | PageBody | TableBody | LayoutBody);

export type BlockFormat =
  | ChartFormat
  | RichTextFormat
  | ImageFormat
  | PageFormat
  | TableFormat
  | LayoutFormat;

export type BlockId = string | null;

export type Block = {
  id: BlockId,
  body: BlockBody,
  format: {
    version: string,
    [ScreenDevice]: BlockFormat,
    ...BlockFormat,
  },
  parent_id: BlockId,
  type: BlockType,
};

export type BlockEditor = {
  dispatch: (BlocksAction) => any,
  editor?: { [string]: any },
  selection: BlockId[],
};

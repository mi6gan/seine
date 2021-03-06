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
import type { ShapeBody, ShapeFormat } from './shapes';
import { SHAPE } from './shapes';

export * from './charts';
export * from './richText';
export * from './layout';
export * from './images';
export * from './page';
export * from './tables';
export * from './shapes';

export const blockTypes = {
  CHART,
  IMAGE: Images,
  LAYOUT,
  PAGE,
  RICH_TEXT,
  TABLE,
  SHAPE,
};

export const blockTypes_v0_3 = {
  CHART: `v0.3/${CHART}`,
  IMAGE: `v0.3/${Images}`,
  LAYOUT: `v0.3/${LAYOUT}`,
  PAGE: `v0.3/${PAGE}`,
  RICH_TEXT: `v0.3/${RICH_TEXT}`,
  TABLE: `v0.3/${TABLE}`,
};

export const defaultBlockFormat = {};
export const defaultBlockBody = {};

export type ScreenDevice = 'any' | 'mobile' | 'tablet' | 'desktop';

export type BlockElement = ChartElement;

export type BlockType = $Values<typeof blockTypes>;

export type BlockBody = ItemBody &
  (
    | ChartBody
    | RichTextBody
    | ImageBody
    | PageBody
    | TableBody
    | LayoutBody
    | ShapeBody
  );

export type BlockFormat =
  | ChartFormat
  | RichTextFormat
  | ImageFormat
  | PageFormat
  | TableFormat
  | LayoutFormat
  | ShapeFormat;

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

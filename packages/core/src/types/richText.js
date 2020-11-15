// @flow
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

import type { ItemFormat } from './layout';

export type RichTextBody = RawDraftContentState;

export type TextAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'start' | 'center' | 'end';

export type RichTextFormat = ItemFormat & {
  textAlignment: TextAlignment,
  verticalAlignment: VerticalAlignment,
};

export const defaultRichTextFormat = {};

export const RICH_TEXT = 'draft';

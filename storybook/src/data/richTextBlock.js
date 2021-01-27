import { blockTypes, createBlock, defaultRichTextFormat } from '@seine/core';
import { defaultTableCell } from '@seine/content';

export const rootBlock = createBlock(
  blockTypes.PAGE,
  null,
  null,
  null,
  blockTypes.PAGE
);

export const richTextBlock = createBlock(
  blockTypes.RICH_TEXT,
  {
    entityMap: {},
    blocks: [
      {
        key: 'bnjkc',
        text: 'Rich text',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  },
  defaultRichTextFormat,
  rootBlock.id,
  blockTypes.RICH_TEXT
);

export const tableBlock = createBlock(
  blockTypes.TABLE,
  {
    header: [
      { ...defaultTableCell, text: 'Column 1' },
      { ...defaultTableCell, text: 'Column 2' },
    ],
    rows: [
      [defaultTableCell, defaultTableCell],
      [defaultTableCell, defaultTableCell],
    ],
  },
  defaultRichTextFormat,
  rootBlock.id,
  blockTypes.TABLE
);

import { blockTypes, defaultRichTextFormat } from '@seine/core';

export const rootBlock = {
  id: 'root',
};

export const richTextBlock = {
  id: blockTypes.RICH_TEXT,
  type: blockTypes.RICH_TEXT,
  body: {
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
  format: defaultRichTextFormat,
  parent_id: rootBlock.id,
};

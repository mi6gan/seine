// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import TutorialStory from './TutorialStory';

import { blockTypes, createBlock, createBlocksFromTree } from '@seine/core';
import { toRawContent } from '@seine/content';

export default {
  title: 'Tutorial/Size And Position',
};

const rootBlock = createBlock(blockTypes.PAGE);
const blocks = createBlocksFromTree(rootBlock, [
  {
    type: blockTypes.RICH_TEXT,
    body: toRawContent('left item'),
  },
  {
    type: blockTypes.RICH_TEXT,
    body: toRawContent('right item'),
  },
]);

const [leftBlock] = blocks.filter(
  (block) => block['parent_id'] === rootBlock.id
);

// eslint-disable-next-line
export const ItemSize = () => {
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `block#${leftBlock.id}`,
          tooltip: 'Select left item block',
        },
        {
          anchor: 'design#item',
          tooltip: 'Set minimum item width to 50%',
        },
      ])}
      blocks={blocks}
    />
  );
};

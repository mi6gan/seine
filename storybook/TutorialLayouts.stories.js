// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import TutorialStory from './TutorialStory';

import {
  CREATE_BLOCK,
  blockTypes,
  createBlock,
  createBlocksFromTree,
} from '@seine/core';
import { toRawContent } from '@seine/content';

export default {
  title: 'Tutorial/Layout',
};

const rootBlock = createBlock(blockTypes.PAGE);

// eslint-disable-next-line
export const FlexLayout = () => {
  const blocks = useAutoMemo(
    createBlocksFromTree(rootBlock, [
      {
        type: blockTypes.RICH_TEXT,
        body: toRawContent('left item'),
      },
      {
        type: blockTypes.RICH_TEXT,
        body: toRawContent('right item'),
      },
    ])
  );
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${blocks[1].id}`,
          tooltip: 'Select left block.',
        },
        {
          anchor: `tree-item#${blocks[2].id}`,
          tooltip: 'Press Ctrl and select right block.',
        },
        {
          anchor: `block#${blocks[1].id}`,
          tooltip:
            'Click using right mouse button on selected blocks and select "Create layout"',
        },
        {
          anchor: `block#${blocks[1].id}`,
          tooltip: 'Set layout type to flex',
        },
      ])}
      blocks={blocks}
    />
  );
};

// eslint-disable-next-line
export const GridLayout = () => {
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${rootBlock.id}`,
          tooltip: 'Select your empty document in tree view.',
        },
        {
          anchor: `action-button#${CREATE_BLOCK}(type=${blockTypes.TABLE}&kind=null)`,
          tooltip: 'Add new table by clicking corresponding toolbar button',
        },
        {
          anchor: `block#${blockTypes.TABLE}`,
          tooltip: 'Click on newly added block to edit the table',
        },
      ])}
      blocks={[rootBlock]}
    />
  );
};

// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import TutorialStory from './TutorialStory';

import { blockTypes, createBlock, createBlocksFromTree } from '@seine/core';
import { toRawContent } from '@seine/content';

export default {
  title: 'Tutorial/Size And Position',
};

// eslint-disable-next-line
export const ItemRelativeWidth = () => {
  const rootBlock = useAutoMemo(createBlock(blockTypes.PAGE));
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

  const [leftBlock] = useAutoMemo(
    blocks.filter((block) => block['parent_id'] === rootBlock.id)
  );
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${leftBlock.id}`,
          tooltip: 'Select left item block',
        },
        {
          anchor: 'design#input(name=minWidth)',
          tooltip: 'Set minimum item width to 50%',
          placement: 'top',
          value: '50',
        },
        {
          anchor: `block#${leftBlock.id}`,
          tooltip:
            'Now left block is guaranteed to be not less then half of parent width',
        },
      ])}
      blocks={blocks}
    />
  );
};
// eslint-disable-next-line
export const ItemAbsoluteHeight = () => {
  const rootBlock = useAutoMemo(
    createBlock(blockTypes.PAGE, null, { direction: 'column' })
  );
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

  const [leftBlock] = useAutoMemo(
    blocks.filter((block) => block['parent_id'] === rootBlock.id)
  );
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${leftBlock.id}`,
          tooltip: 'Select top item block',
        },
        {
          anchor: 'design#select(name=heightUnits)',
          tooltip: 'Set height constraint units to px',
          placement: 'top',
          value: 'px',
        },
        {
          anchor: 'design#input(name=minHeight)',
          tooltip: 'Set minimum item height to 300px',
          placement: 'top',
          value: '300',
        },
        {
          anchor: `block#${leftBlock.id}`,
          tooltip:
            'Now top block height is guaranteed to be not less then 300px',
        },
      ])}
      blocks={blocks}
    />
  );
};

// eslint-disable-next-line
export const LayoutAlignment = () => {
  const rootBlock = useAutoMemo(createBlock(blockTypes.PAGE));
  const blocks = useAutoMemo(
    createBlocksFromTree(rootBlock, [
      {
        type: blockTypes.RICH_TEXT,
        body: toRawContent('Lorem ipsum dolor sit amet'),
      },
      {
        type: blockTypes.RICH_TEXT,
        body: toRawContent('Vestibulum ante ipsum primis in'),
      },
    ])
  );

  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${rootBlock.id}`,
          tooltip: 'Select document in tree view.',
        },
        {
          anchor: 'layout#toggle(name=justify)',
          tooltip: 'Click second button in justify group',
          placement: 'top',
          value: 'center',
        },
        {
          anchor: `tree-item#${rootBlock.id}`,
          placement: 'top',
          tooltip:
            'Now both blocks will always justify to the center document.',
        },
      ])}
      blocks={blocks}
    />
  );
};

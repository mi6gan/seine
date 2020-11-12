// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import { layoutTypes } from '../packages/core/src/types';

import TutorialStory from './TutorialStory';

import {
  blockTypes,
  CREATE_BLOCK,
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
        body: toRawContent('other item'),
      },
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
          anchor: `tree-item#${blocks[2].id}`,
          tooltip: 'Select left block.',
        },
        {
          anchor: `tree-item#${blocks[3].id}`,
          tooltip: 'Press Ctrl and select right block.',
        },
        {
          anchor: `block#${blocks[2].id}`,
          tooltip: 'Click using right mouse button on selected blocks',
        },
        {
          anchor: `item-menu#Create layout`,
          tooltip: 'And create common layout for selected items',
          placement: 'right',
        },
        {
          anchor: `design#select(name=kind)`,
          tooltip: 'Change grid to flex',
          placement: 'top',
          value: layoutTypes.FLEX,
        },
        {
          anchor: `design#select(name=direction)`,
          tooltip: 'Set direction to column to align item vertically',
          value: 'column',
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

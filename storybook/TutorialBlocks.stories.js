// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import TutorialStory from './TutorialStory';

import { blockTypes, chartTypes, CREATE_BLOCK, createBlock } from '@seine/core';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Tutorial/Structure',
};

const rootBlock = createBlock(blockTypes.PAGE);

// eslint-disable-next-line
export const AddRichText = () => {
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${rootBlock.id}`,
          tooltip: 'Select your empty document in tree view.',
        },
        {
          anchor: `action-button#${CREATE_BLOCK}(type=${blockTypes.RICH_TEXT}&kind=null)`,
          tooltip: 'Add new text by clicking corresponding toolbar button',
        },
        {
          anchor: `block#${blockTypes.RICH_TEXT}`,
          tooltip: 'Click on newly added block to edit it text',
        },
      ])}
      blocks={[rootBlock]}
    />
  );
};
AddRichText.parameters = {
  storyshots: {
    disable: true,
  },
};

// eslint-disable-next-line
export const AddTable = () => {
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
AddTable.parameters = {
  storyshots: {
    disable: true,
  },
};

// eslint-disable-next-line
export const AddPieChart = () => {
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${rootBlock.id}`,
          tooltip: 'Select your empty document in tree view.',
        },
        {
          anchor: `action-button#${CREATE_BLOCK}(type=${blockTypes.CHART}&kind=${chartTypes.PIE})`,
          tooltip: 'Add new pie chart by clicking corresponding toolbar button',
        },
        {
          anchor: `block#${blockTypes.CHART}`,
          tooltip: 'Click on newly added block to edit pie chart',
        },
      ])}
      blocks={[rootBlock]}
    />
  );
};
AddPieChart.parameters = {
  storyshots: {
    disable: true,
  },
};

// eslint-disable-next-line
export const AddImage = () => {
  return (
    <TutorialStory
      scenario={useAutoMemo([
        {
          anchor: `tree-item#${rootBlock.id}`,
          tooltip: 'Select your empty document in tree view.',
        },

        {
          anchor: `action-button#${CREATE_BLOCK}(type=${blockTypes.IMAGE}&kind=null)`,
          tooltip: 'Add new pie chart by clicking corresponding toolbar button',
        },
        {
          anchor: `block#${blockTypes.IMAGE}`,
          tooltip: 'Click on newly added block to edit image',
        },
      ])}
      blocks={[rootBlock]}
    />
  );
};
AddImage.parameters = {
  storyshots: {
    disable: true,
  },
};

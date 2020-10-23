// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { actions } from '@storybook/addon-actions';

import { UPDATE_BLOCK_BODY } from '../packages/core/src/reducers';
import { useBlocksDispatch } from '../packages/editor/src/blocks';
import { useSelectedLayoutItems } from '../packages/editor/src/layouts';
import { createBlock, createBlocksFromTree } from '../packages/core/src/utils';
import {
  blockTypes,
  defaultImageBody,
  defaultImageFormat,
} from '../packages/core/src/types';

import { ThemeProvider } from '@seine/styles';
import { Editor, EditorDesign, ImageDesign } from '@seine/editor';

export default {
  title: 'Custom Editor',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

// eslint-disable-next-line
function ExtendedImageDesign() {
  const dispatch = useBlocksDispatch();
  const { item } = useSelectedLayoutItems();
  return (
    <ImageDesign
      onChange={useAutoCallback((event) => {
        dispatch({
          type: UPDATE_BLOCK_BODY,
          id: item && item.id,
          body: { file: event.currentTarget.files[0].name },
        });
      })}
    />
  );
}

// eslint-disable-next-line
function ExtendedEditorDesign() {
  return <EditorDesign imageDesignAs={ExtendedImageDesign} />;
}

export const CustomImageDesignEditor = () => (
  <Editor editorDesignAs={ExtendedEditorDesign} {...actions('onChange')}>
    {useAutoMemo(
      createBlocksFromTree(createBlock(blockTypes.PAGE), [
        {
          type: blockTypes.IMAGE,
          format: defaultImageFormat,
          body: defaultImageBody,
        },
      ])
    )}
  </Editor>
);

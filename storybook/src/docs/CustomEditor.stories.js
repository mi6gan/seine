// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { actions } from '@storybook/addon-actions';

import {
  createBlock,
  createBlocksFromTree,
  UPDATE_BLOCK_BODY,
  blockTypes,
  defaultImageBody,
  defaultImageFormat,
} from '@seine/core';
import { ThemeProvider } from '@seine/styles';
import {
  Editor,
  EditorDesign,
  ImageDesign,
  useBlocksDispatch,
  useSelectedLayoutItems,
} from '@seine/editor';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
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

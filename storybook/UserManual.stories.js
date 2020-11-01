// @flow
import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider, Box } from '@seine/styles';
import { Paper, Tooltip, Typography } from '@seine/styles/mui-core.macro';
import {
  allBlocksSelector,
  defaultBlockRenderMap,
  EditorProvider,
  useBlocksChange,
  useEditorSelector,
  EditorTree,
  EditorToolbar,
  EditorItemMenu,
  ItemMenuProvider,
} from '@seine/editor';
import { Content } from '@seine/content';
import { blockTypes, createBlock } from '@seine/core';

const rootBlock = createBlock(blockTypes.PAGE);

export default {
  title: 'User Manual/Blocks',
  decorators: [
    (Story) => (
      <ThemeProvider>
        <EditorProvider blocks={[rootBlock]}>
          <ItemMenuProvider>
            <Story />
          </ItemMenuProvider>
        </EditorProvider>
      </ThemeProvider>
    ),
  ],
};

// eslint-disable-next-line
export const AddRichText = () => {
  useBlocksChange(action('onChange'));
  const rootIsSelected = useEditorSelector(({ selection }) =>
    selection.includes(rootBlock.id)
  );

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Tooltip
        placement={'bottom-start'}
        open={rootIsSelected}
        arrow
        title={
          <Typography variant={'body1'}>
            This is block addition toolbar.
            <br />
            Click on text block icon to add it to the root.
          </Typography>
        }
      >
        <EditorToolbar position={'relative'} />
      </Tooltip>
      <EditorItemMenu />
      <Box display={'flex'} width={1}>
        <Tooltip
          open={!rootIsSelected}
          arrow
          title={
            <Typography variant={'body1'}>
              This is the root block in content structure panel.
              <br />
              To select it as current edit target click it.
            </Typography>
          }
          placement={'right-start'}
        >
          <Box width={1 / 6}>
            <EditorTree />
          </Box>
        </Tooltip>
        <Box as={Paper} width={1} minHeight={'75vh'} squared>
          <Content blockRenderMap={defaultBlockRenderMap}>
            {useEditorSelector(allBlocksSelector)}
          </Content>
        </Box>
      </Box>
    </Box>
  );
};

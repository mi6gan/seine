// @flow
import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { useAutoMemo, useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { Box, ThemeProvider } from '@seine/styles';
import { Paper, Popover, Typography } from '@seine/styles/mui-core.macro';
import {
  allBlocksSelector,
  defaultBlockRenderMap,
  EditorItemMenu,
  EditorProvider,
  EditorToolbar,
  EditorTree,
  ItemMenuProvider,
  ClipboardProvider,
  useBlocksChange,
  useEditorSelector,
  defaultTheme,
} from '@seine/editor';
import { Content } from '@seine/content';
import { blockTypes, createBlock } from '@seine/core';

const rootBlock = createBlock(blockTypes.PAGE);

export default {
  title: 'User Manual/Blocks',
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <EditorProvider blocks={[rootBlock]}>
          <ClipboardProvider>
            <ItemMenuProvider>
              <Story />
            </ItemMenuProvider>
          </ClipboardProvider>
        </EditorProvider>
      </ThemeProvider>
    ),
  ],
};

const ManualStep = () => null;

const StyledPopover = styled(Popover)`
  pointer-events: none;
`;

// eslint-disable-next-line
function ManualPopover({ children, container }) {
  const step = React.Children.toArray(children).find(
    ({ props }) => props.current
  );
  const { selector = null, ...popoverProps } = (step && step.props) || {};
  const anchorEl = useAutoMemo(
    step && selector && container ? container.querySelector(selector) : null
  );
  return (
    <StyledPopover
      {...popoverProps}
      anchorEl={anchorEl}
      open={anchorEl !== null}
      keepMounted
    />
  );
}

// eslint-disable-next-line
export const AddRichText = () => {
  useBlocksChange(action('onChange'));
  const [rootIsSelected, blocksCount] = useEditorSelector(
    useAutoCallback(({ selection, blocks }) => [
      selection.includes(rootBlock.id),
      blocks.length,
    ])
  );

  const [container, setContainer] = React.useState(null);

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} ref={setContainer}>
        <EditorToolbar position={'relative'} />
        <EditorItemMenu />
        <Box display={'flex'} width={1}>
          <Box width={1 / 6}>
            <EditorTree />
          </Box>
          <Box as={Paper} width={1} minHeight={'75vh'} squared>
            <Content blockRenderMap={defaultBlockRenderMap}>
              {useEditorSelector(allBlocksSelector)}
            </Content>
          </Box>
        </Box>
      </Box>
      {container && (
        <ManualPopover container={container}>
          <ManualStep
            current={!rootIsSelected && blocksCount === 1}
            selector={'[data-tree="block"]'}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          >
            <Typography>
              This is the root block in content structure panel. <br />
              To select it as current edit target click it.
            </Typography>
          </ManualStep>

          <ManualStep
            current={rootIsSelected && blocksCount === 1}
            selector={'[data-create="rich-text"]'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Typography>This is toolbar.</Typography>
          </ManualStep>

          <ManualStep
            current={blocksCount === 2}
            selector={'[data-tree="block"]'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Typography>This is toolbar.</Typography>
          </ManualStep>
        </ManualPopover>
      )}
    </>
  );
};

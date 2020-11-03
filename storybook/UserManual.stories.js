// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { actions } from '@storybook/addon-actions';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import { Tooltip, Typography } from '@seine/styles/mui-core.macro';
import type {
  EditorActionButtonProps,
  EditorTreeItemProps,
} from '@seine/editor';
import {
  BlockTypeName,
  Editor,
  EditorActionButton,
  EditorToolbar,
  EditorTree,
  EditorTreeItem,
  defaultBlockRenderMap,
} from '@seine/editor';
import { blockTypes, CREATE_BLOCK, createBlock, chartTypes } from '@seine/core';

const rootBlock = createBlock(blockTypes.PAGE);

const ManualContext = React.createContext({
  back: () => void 0,
  next: () => void 0,
});

// eslint-disable-next-line
function ManualProvider({ children, scenario }) {
  const [index, setIndex] = React.useState(0);

  return (
    <ManualContext.Provider
      value={useAutoMemo({
        current: scenario[index],
        back: () => setIndex(index - 1),
        next: () => setIndex(index + 1),
      })}
    >
      {children}
    </ManualContext.Provider>
  );
}

export default {
  title: 'User Manual/Blocks',
};

// eslint-disable-next-line
function ManualTooltip({
  anchor,
  children,
  title,
  openAs: Open = null,
  onClick,
  ...tooltipProps
}) {
  const manual = React.useContext(ManualContext);
  const open = manual.current === anchor;
  return (
    <Tooltip
      {...tooltipProps}
      open={open}
      arrow
      title={<Typography>{title}</Typography>}
      onClick={onClick}
    >
      {open && Open ? <Open>{children}</Open> : children}
    </Tooltip>
  );
}

// eslint-disable-next-line
function ManualActionButton(props: EditorActionButtonProps) {
  const {
    type,
    block: { type: blockType = null, format: { kind = null } = {} } = {},
  } = props;
  const { next } = React.useContext(ManualContext);
  return (
    <ManualTooltip
      anchor={`action-button#${type}(type=${blockType}&kind=${kind})`}
      title={
        type === CREATE_BLOCK && type ? (
          <>
            Add new <BlockTypeName type={blockType} kind={kind} /> by clicking
            corresponding toolbar button
          </>
        ) : (
          ''
        )
      }
    >
      <EditorActionButton {...props} onClick={next} />
    </ManualTooltip>
  );
}

// eslint-disable-next-line
function ManualTreeItem({ id, ...props }: EditorTreeItemProps) {
  const { next } = React.useContext(ManualContext);
  return (
    <ManualTooltip
      title={
        id === rootBlock.id ? 'Select your empty document in tree view.' : ''
      }
      anchor={`tree-item#${id}`}
    >
      <EditorTreeItem {...props} id={id} onClick={next} />
    </ManualTooltip>
  );
}

const ManualFrame = styled.div`
  border: 1px solid black;
  height: 1.8rem;
`;

// eslint-disable-next-line
function ManualBlock({ type, kind, anchor, ...props }) {
  const Block = defaultBlockRenderMap[type];
  const { next } = React.useContext(ManualContext);
  return (
    <ManualTooltip
      title={
        <>
          Click on newly added <BlockTypeName type={type} kind={kind} /> to edit
          it.
        </>
      }
      anchor={anchor}
      openAs={ManualFrame}
    >
      <Block type={type} kind={kind} {...props} onClick={next} />
    </ManualTooltip>
  );
}

const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes.RICH_TEXT]: (props) => (
    <ManualBlock
      {...props}
      type={blockTypes.RICH_TEXT}
      anchor={`block#rich-text`}
    />
  ),
  [blockTypes.TABLE]: (props) => (
    <ManualBlock {...props} type={blockTypes.TABLE} anchor={`block#table`} />
  ),
  [blockTypes.CHART]: (props) => (
    <ManualBlock
      {...props}
      type={blockTypes.CHART}
      anchor={`block#pie-chart`}
    />
  ),
  [blockTypes.IMAGE]: (props) => (
    <ManualBlock {...props} type={blockTypes.IMAGE} anchor={`block#image`} />
  ),
};

const ManualStory = ({ scenario }) => (
  <ManualProvider scenario={scenario}>
    <Editor
      {...actions('onChange')}
      blockRenderMap={blockRenderMap}
      treeAs={useAutoCallback((props) => (
        <EditorTree {...props} itemAs={ManualTreeItem} />
      ))}
      toolbarAs={useAutoCallback((props) => (
        <EditorToolbar
          {...props}
          position={'relative'}
          actionButtonAs={ManualActionButton}
        />
      ))}
    >
      {[rootBlock]}
    </Editor>
  </ManualProvider>
);

// eslint-disable-next-line
export const AddBlocks = () => {
  return (
    <ManualStory
      scenario={useAutoMemo([
        `tree-item#${rootBlock.id}`,
        `action-button#${CREATE_BLOCK}(type=${blockTypes.RICH_TEXT}&kind=null)`,
        'block#rich-text',

        `tree-item#${rootBlock.id}`,
        `action-button#${CREATE_BLOCK}(type=${blockTypes.TABLE}&kind=null)`,
        'block#table',

        `tree-item#${rootBlock.id}`,
        `action-button#${CREATE_BLOCK}(type=${blockTypes.CHART}&kind=${chartTypes.PIE})`,
        'block#pie-chart',

        `tree-item#${rootBlock.id}`,
        `action-button#${CREATE_BLOCK}(type=${blockTypes.IMAGE}&kind=null)`,
        'block#image',
      ])}
    />
  );
};

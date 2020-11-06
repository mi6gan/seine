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
  defaultBlockRenderMap,
  Editor,
  EditorActionButton,
  EditorToolbar,
  EditorTree,
  EditorTreeItem,
  useSelectedLayoutItems,
  EditorDesign,
  ItemDesign,
} from '@seine/editor';
import { blockTypes } from '@seine/core';

const TutorialContext = React.createContext({
  back: () => void 0,
  next: () => void 0,
});

// eslint-disable-next-line
function TutorialProvider({ children, scenario }) {
  const [index, setIndex] = React.useState(0);

  return (
    <TutorialContext.Provider
      value={useAutoMemo({
        ...scenario[index],
        back: () => setIndex(index - 1),
        next: () => setIndex(index + 1),
      })}
    >
      {children}
    </TutorialContext.Provider>
  );
}

// eslint-disable-next-line
const TutorialTooltip = React.forwardRef(function TutorialTooltip(
  { anchor, children, openAs: Open = null, onClick, ...tooltipProps },
  ref
) {
  const manual = React.useContext(TutorialContext);
  const open = manual.anchor === anchor;

  let tooltipRef = React.useRef(null);
  if (ref) {
    tooltipRef = ref;
  }

  React.useImperativeHandle(tooltipRef, () => ({
    next: () => {
      if (open) {
        manual.next();
      }
    },
  }));
  return (
    <Tooltip
      {...tooltipProps}
      open={open}
      arrow
      title={<Typography>{manual.tooltip}</Typography>}
      onClick={onClick}
    >
      {open && Open ? <Open>{children}</Open> : children}
    </Tooltip>
  );
});

// eslint-disable-next-line
function TutorialActionButton(props: EditorActionButtonProps) {
  const {
    type,
    block: { type: blockType = null, format: { kind = null } = {} } = {},
  } = props;
  const manualRef = React.useRef(null);
  return (
    <TutorialTooltip
      ref={manualRef}
      anchor={`action-button#${type}(type=${blockType}&kind=${kind})`}
    >
      <EditorActionButton
        {...props}
        blockId={blockType}
        onClick={useAutoCallback(() => {
          manualRef.current.next();
        })}
      />
    </TutorialTooltip>
  );
}

// eslint-disable-next-line
function TutorialTreeItem({ id, ...props }: EditorTreeItemProps) {
  const manualRef = React.useRef(null);
  return (
    <TutorialTooltip ref={manualRef} anchor={`tree-item#${id}`}>
      <EditorTreeItem
        {...props}
        id={id}
        onClick={useAutoCallback(() => {
          manualRef.current.next();
        })}
      />
    </TutorialTooltip>
  );
}

const TutorialFrame = styled.div`
  border: 1px solid black;
  height: 1.8rem;
`;

// eslint-disable-next-line
function TutorialBlock({ type, kind, anchor, ...props }) {
  const Block = defaultBlockRenderMap[type];
  const manualRef = React.useRef(null);
  const { items } = useSelectedLayoutItems();
  const item = items.find((block) => block.type === type) || null;
  const isSelected = !!(item && item.id === props.id);
  const next = useAutoCallback(() => {
    manualRef.current.next();
  });

  return (
    <TutorialTooltip
      ref={manualRef}
      anchor={`block#${props.id}`}
      openAs={TutorialFrame}
    >
      <Block
        type={type}
        kind={kind}
        {...props}
        {...(!isSelected && { onClick: next })}
      />
    </TutorialTooltip>
  );
}

// eslint-disable-next-line
const TutorialItemDesign = (props) => {
  const manualRef = React.useRef(null);
  return (
    <TutorialTooltip ref={manualRef} anchor={`design#item`}>
      <ItemDesign
        {...props}
        onClick={useAutoCallback(() => {
          manualRef.current.next();
        })}
      />
    </TutorialTooltip>
  );
};

const blockRenderMap = {
  ...defaultBlockRenderMap,
  [blockTypes.RICH_TEXT]: (props) => (
    <TutorialBlock {...props} type={blockTypes.RICH_TEXT} />
  ),
  [blockTypes.TABLE]: (props) => (
    <TutorialBlock {...props} type={blockTypes.TABLE} />
  ),
  [blockTypes.CHART]: (props) => (
    <TutorialBlock {...props} type={blockTypes.CHART} />
  ),
  [blockTypes.IMAGE]: (props) => (
    <TutorialBlock {...props} type={blockTypes.IMAGE} />
  ),
};

// eslint-disable-next-line
export default function TutorialStory({ scenario, blocks }) {
  return (
    <TutorialProvider scenario={scenario}>
      <Editor
        {...actions('onChange')}
        blockRenderMap={blockRenderMap}
        treeAs={useAutoCallback((props) => (
          <EditorTree {...props} itemAs={TutorialTreeItem} />
        ))}
        toolbarAs={useAutoCallback((props) => (
          <EditorToolbar
            {...props}
            position={'relative'}
            actionButtonAs={TutorialActionButton}
          />
        ))}
        designAs={useAutoCallback((props) => (
          <EditorDesign {...props} itemDesignAs={TutorialItemDesign} />
        ))}
      >
        {blocks}
      </Editor>
    </TutorialProvider>
  );
}

// @flow
import * as React from 'react';
import { actions } from '@storybook/addon-actions';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import { Tooltip, Typography } from '@seine/styles/mui-core.macro';
import type {
  EditorActionButtonProps,
  EditorTreeItemProps,
} from '@seine/editor';
import {
  defaultBlockRenderMap,
  ItemDesign,
  LayoutDesign,
  EditorActionButton,
  EditorToolbar,
  EditorTree,
  EditorTreeItem,
  EditorDesign,
  Editor,
  SidebarInput,
  SidebarSelect,
  ToolbarToggleButtonGroup,
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
        find: (fn) => scenario.find(fn),
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
    ...manual.find((item) => item.anchor === anchor),
    next: () => {
      if (open) {
        manual.next();
      }
    },
  }));
  return (
    <Tooltip
      {...tooltipProps}
      placement={manual.placement || 'bottom'}
      open={open}
      arrow
      title={<Typography>{manual.tooltip}</Typography>}
      onClick={onClick}
      popperProps={{ keepMounted: true }}
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

// eslint-disable-next-line
function TutorialBlock({ type, kind, anchor, ...props }) {
  const Block = defaultBlockRenderMap[type];
  const manualRef = React.useRef(null);
  const next = useAutoCallback(() => {
    manualRef.current.next();
  });

  return (
    <TutorialTooltip ref={manualRef} anchor={`block#${props.id}`}>
      <Block type={type} kind={kind} onClick={next} {...props} />
    </TutorialTooltip>
  );
}

// eslint-disable-next-line
const TutorialItemDesignInput = ({ name, onChange, ...props }) => {
  const manualRef = React.useRef(null);
  return (
    <TutorialTooltip ref={manualRef} anchor={`design#input(name=${name})`}>
      <SidebarInput
        {...props}
        name={name}
        onChange={useAutoCallback((event) => {
          if (
            'value' in manualRef.current &&
            manualRef.current.value === event.currentTarget.value
          ) {
            manualRef.current.next();
          }
          onChange(event);
        })}
      />
    </TutorialTooltip>
  );
};

// eslint-disable-next-line
const TutorialItemDesignSelect = ({ name, ...props }) => {
  const manualRef = React.useRef(null);
  return (
    <TutorialTooltip ref={manualRef} anchor={`design#select(name=${name})`}>
      <SidebarSelect
        {...props}
        name={name}
        onChange={useAutoCallback((event) => {
          if (
            'value' in manualRef.current &&
            manualRef.current.value === event.target.value
          ) {
            manualRef.current.next();
          }
        })}
      />
    </TutorialTooltip>
  );
};

// eslint-disable-next-line
const TutorialItemDesign = (props) => {
  return (
    <ItemDesign
      {...props}
      inputAs={TutorialItemDesignInput}
      selectAs={TutorialItemDesignSelect}
    />
  );
};

const TutorialLayoutToggleButton = ({ name, onChange, ...props }) => {
  const manualRef = React.useRef(null);
  return (
    <TutorialTooltip ref={manualRef} anchor={`layout#toggle(name=${name})`}>
      <ToolbarToggleButtonGroup
        {...props}
        name={name}
        onChange={useAutoCallback((event, value) => {
          if (
            'value' in manualRef.current &&
            manualRef.current.value === value
          ) {
            manualRef.current.next();
          }
          if (onChange) {
            onChange(event, value);
          }
        })}
      />
    </TutorialTooltip>
  );
};

// eslint-disable-next-line
const TutorialLayoutDesign = (props) => {
  return <LayoutDesign {...props} toggleAs={TutorialLayoutToggleButton} />;
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
          <EditorDesign
            {...props}
            itemDesignAs={TutorialItemDesign}
            layoutDesignAs={TutorialLayoutDesign}
          />
        ))}
      >
        {blocks}
      </Editor>
    </TutorialProvider>
  );
}
// @flow
import * as React from 'react';
import { actions } from '@storybook/addon-actions';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';

import useEditorDispatch from '../../../packages/editor/src/blocks/useEditorDispatch';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from '@seine/styles/mui-core.macro';
import type {
  EditorActionButtonProps,
  EditorTreeItemProps,
} from '@seine/editor';
import {
  allBlocksSelector,
  defaultBlockRenderMap,
  Editor,
  EditorActionButton,
  EditorDesign,
  EditorItemMenu,
  EditorToolbar,
  EditorTree,
  EditorTreeItem,
  ItemDesign,
  LayoutDesign,
  MenuButton,
  SidebarInput,
  SidebarSelect,
  ToolbarToggleButtonGroup,
  useEditorSelector,
} from '@seine/editor';
import { blockTypes, RESET_BLOCKS } from '@seine/core';
import { defaultBlockRenderMap as disabledBlockRenderMap } from '@seine/content';

const TutorialContext = React.createContext({
  back: () => void 0,
  next: () => void 0,
});

type TutorialProviderProps = {
  children: React.Node,
  scenario: Array<{ modal: string } | { tooltip: string, anchor: 'string' }>,
};

// eslint-disable-next-line
function TutorialProvider({ children, scenario }: TutorialProviderProps) {
  const [index, setIndex] = React.useState(0);

  return (
    <TutorialContext.Provider
      value={useAutoMemo({
        ...scenario[index],
        steps: [...new Set(scenario.map(({ step }) => step))],
        setStep: (step) =>
          setIndex(scenario.findIndex((item) => item.step === step)),
        find: (fn) => scenario.find(fn),
        back: () => setIndex(index - 1),
        next: () => {
          setTimeout(() => setIndex(index + 1), 500);
        },
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

  if (anchor.startsWith('#')) {
    return (
      <Dialog open={open}>
        <DialogContent>{manual.tooltip}</DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            size={'small'}
            onClick={() => {
              manual.next();
            }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

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
  const anchor = `action-button#${type}(type=${blockType}&kind=${kind})`;
  const manual = React.useContext(TutorialContext);
  return (
    <TutorialTooltip anchor={anchor}>
      <EditorActionButton
        {...props}
        disabled={manual.anchor !== anchor}
        blockId={blockType}
        onClick={useAutoCallback(() => {
          manual.next();
        })}
      />
    </TutorialTooltip>
  );
}

// eslint-disable-next-line
function TutorialTreeItem({ id, ...props }: EditorTreeItemProps) {
  const manual = React.useContext(TutorialContext);
  const anchor = `tree-item#${id}`;
  return (
    <TutorialTooltip anchor={anchor}>
      <EditorTreeItem
        {...props}
        disabled={manual.anchor !== anchor}
        id={id}
        onClick={useAutoCallback(() => {
          manual.next();
        })}
      />
    </TutorialTooltip>
  );
}

// eslint-disable-next-line
function TutorialBlock({ type, kind, ...props }) {
  const manual = React.useContext(TutorialContext);
  const anchor = `block#${props.id}`;
  const Block =
    anchor === manual.anchor
      ? defaultBlockRenderMap[type]
      : disabledBlockRenderMap[type];
  const next = useAutoCallback(() => {
    manual.next();
  });

  return (
    <TutorialTooltip anchor={anchor}>
      <Block
        type={type}
        kind={kind}
        onClick={next}
        onMouseDown={next}
        {...props}
      />
    </TutorialTooltip>
  );
}

// eslint-disable-next-line
const TutorialItemDesignInput = ({ name, onChange, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#input(name=${name})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <SidebarInput
        {...props}
        disabled={anchor !== manual.anchor}
        name={name}
        onChange={useAutoCallback((event) => {
          if ('value' in manual && manual.value === event.currentTarget.value) {
            manual.next();
          }
          onChange(event);
        })}
      />
    </TutorialTooltip>
  );
};

// eslint-disable-next-line
const TutorialItemDesignSelect = ({ name, onChange, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#select(name=${name})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <SidebarSelect
        {...props}
        disabled={anchor !== manual.anchor}
        name={name}
        onChange={useAutoCallback((event) => {
          if ('value' in manual && manual.value === event.target.value) {
            manual.next();
          }
          onChange && onChange(event);
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
  const manual = React.useContext(TutorialContext);
  const anchor = `design#toggle(name=${name})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <ToolbarToggleButtonGroup
        {...props}
        disabled={anchor !== manual.anchor}
        name={name}
        onChange={useAutoCallback((event, value) => {
          if ('value' in manual && manual === value) {
            manual.next();
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
  return (
    <LayoutDesign
      {...props}
      toggleAs={TutorialLayoutToggleButton}
      inputAs={TutorialItemDesignInput}
      selectAs={TutorialItemDesignSelect}
    />
  );
};

// eslint-disable-next-line
const TutorialItemMenuButton = React.forwardRef(
  ({ onClick, ...props }, ref) => {
    const manual = React.useContext(TutorialContext);
    return (
      <TutorialTooltip
        anchor={`item-menu#${
          typeof props.children === 'string' ? props.children : 'null'
        }`}
      >
        <MenuButton
          {...props}
          ref={ref}
          onClick={useAutoCallback((event) => {
            manual.next();
            onClick && onClick(event);
          })}
        />
      </TutorialTooltip>
    );
  }
);

// eslint-disable-next-line
const TutorialItemMenu = (props) => {
  return <EditorItemMenu {...props} menuButtonAs={TutorialItemMenuButton} />;
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
function Navigation() {
  const stepBlocksRef = React.useRef({});
  const { current: stepBlocks } = stepBlocksRef;
  const dispatch = useEditorDispatch();

  const manual = React.useContext(TutorialContext);
  const step = manual.step;

  const changeStep = useAutoCallback((event) => {
    const { step: nextStep } = event.currentTarget.dataset;
    manual.setStep(nextStep);
    const blocks = stepBlocks[nextStep];
    if (blocks) {
      dispatch({
        type: RESET_BLOCKS,
        blocks,
      });
    }
  });

  const stepIndex = useAutoMemo(
    manual.steps.findIndex((step) => step === manual.step)
  );

  const blocks = useEditorSelector(allBlocksSelector);

  useAutoEffect(() => {
    if (!(step in stepBlocks)) {
      stepBlocks[step] = blocks.map((block) => ({ ...block }));
    }
  });

  return (
    <Stepper>
      {manual.steps.map((step, index) => (
        <Step
          key={index}
          active={stepIndex === index}
          completed={stepIndex > index}
          onClick={changeStep}
          data-step={step}
        >
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

type Props = {
  scenario: Array<{
    step: string,
    anchor: string,
    tooltip: string,
  }>,
};

// eslint-disable-next-line
export default function Tutorial({ scenario, blocks }: Props) {
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
        itemMenuAs={TutorialItemMenu}
        header={<Navigation />}
      >
        {blocks}
      </Editor>
      <TutorialTooltip anchor={'#introduction'} />
    </TutorialProvider>
  );
}

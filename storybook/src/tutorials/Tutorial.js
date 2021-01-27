// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { actions } from '@storybook/addon-actions';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import ReactDOM from 'react-dom';

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
  Paper,
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
  RichTextDesign,
  MenuButton,
  SidebarInput,
  SidebarSelect,
  ToolbarToggleButtonGroup,
  useBlocksDispatch,
  useEditorSelector,
  EditorContent,
  DeleteConfirmationDialog,
  deviceSelector,
  useBlocksChange,
  SidebarSection,
  SidebarHeading,
} from '@seine/editor';
import { blockTypes } from '@seine/core';
import { defaultBlockRenderMap as disabledBlockRenderMap } from '@seine/content';
import { Box, ThemeProvider } from '@seine/styles';

const TutorialContext = React.createContext({
  back: () => void 0,
  next: () => void 0,
});

type TutorialProviderProps = {
  children: React.Node,
  scenario: Array<{ modal: string } | { tooltip: string, anchor: 'string' }>,
};

// eslint-disable-next-line
function TutorialProvider({
  children,
  scenario,
  states,
}: TutorialProviderProps) {
  const [index, setIndex] = React.useState(0);
  const steps = [...new Set(scenario.map(({ step }) => step))];

  return (
    <TutorialContext.Provider
      value={useAutoMemo({
        ...scenario[index],
        blocks: states[scenario[index].step],
        steps,
        setStep: (step) =>
          setIndex(scenario.findIndex((item) => item.step === step)),
        find: (fn) => scenario.find(fn),
        back: () => setIndex(index - 1),
        next: () => {
          setIndex((index) =>
            index < scenario.length - 1 ? index + 1 : index
          );
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

  useAutoEffect(() => {
    if (manual.duration) {
      const timeoutId = setTimeout(() => {
        manual.next();
      }, manual.duration);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  });

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
            Ok
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
    anchor === manual.anchor || manual.anchor.startsWith('design#')
      ? defaultBlockRenderMap[type]
      : disabledBlockRenderMap[type];
  const next = useAutoCallback(() => {
    manual.next();
  });

  if (anchor === manual.anchor) {
    props.onClick = next;
    props.onMousDown = next;
  }

  return (
    <TutorialTooltip anchor={anchor}>
      <Block type={type} kind={kind} {...props} />
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

const TutorialToggle = ({ name, onChange, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#toggle(name=${name})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <ToolbarToggleButtonGroup
        {...props}
        disabled={anchor !== manual.anchor}
        name={name}
        onChange={useAutoCallback((event, value) => {
          if ('value' in manual && manual.value === value) {
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
      toggleAs={TutorialToggle}
      inputAs={TutorialItemDesignInput}
      selectAs={TutorialItemDesignSelect}
    />
  );
};

// eslint-disable-next-line
const TutorialRichTextDesign = (props) => {
  return <RichTextDesign {...props} toggleAs={TutorialToggle} />;
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
  const manual = React.useContext(TutorialContext);

  const changeStep = useAutoCallback((event) => {
    const { step: nextStep } = event.currentTarget.dataset;
    manual.setStep(nextStep);
  });

  const stepIndex = useAutoMemo(
    manual.steps.findIndex((step) => step === manual.step)
  );

  return (
    <SidebarSection pl={2}>
      <SidebarHeading>Tutorial</SidebarHeading>
      <Stepper orientation={'vertical'}>
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
    </SidebarSection>
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
const MenuContext = React.createContext({
  current: null,
});

// eslint-disable-next-line
function MenuExtension({ children }) {
  const container = React.useContext(MenuContext);
  return container && ReactDOM.createPortal(children, container);
}

const Container = styled(Box)`
  && {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

const EditorToolbarContainer = styled(Box)`
  &&& .MuiAppBar-root {
    position: relative;
  }
`;

// eslint-disable-next-line
function EditorView({ onChange }) {
  const device = useEditorSelector(deviceSelector);
  const blocks = useEditorSelector(allBlocksSelector);

  useBlocksChange(onChange);

  return (
    <>
      <DeleteConfirmationDialog />
      <TutorialItemMenu />
      <MenuExtension>
        <SidebarSection pl={2}>
          <SidebarHeading>Structure</SidebarHeading>
          <EditorTree itemAs={TutorialTreeItem} />
        </SidebarSection>
        <Box pl={2}>
          <EditorDesign
            richTextDesignAs={TutorialRichTextDesign}
            itemDesignAs={TutorialItemDesign}
            layoutDesignAs={TutorialLayoutDesign}
          />
        </Box>
      </MenuExtension>
      <Container>
        <EditorToolbarContainer>
          <EditorToolbar
            position={'relative'}
            actionButtonAs={TutorialActionButton}
          />
        </EditorToolbarContainer>
        <EditorContent device={device} blockRenderMap={blockRenderMap}>
          {blocks}
        </EditorContent>
      </Container>
    </>
  );
}

// eslint-disable-next-line
function TutorialEditor() {
  const { blocks, step } = React.useContext(TutorialContext);

  return (
    <Editor
      {...actions('onChange')}
      key={step}
      as={EditorView}
      blockRenderMap={blockRenderMap}
    >
      {blocks}
    </Editor>
  );
}

// eslint-disable-next-line
export default function Tutorial({ scenario, states }: Props) {
  const [menuContainer, setMenuContainer] = React.useState(null);
  return (
    <ThemeProvider>
      <TutorialProvider scenario={scenario} states={states}>
        <Box display={'flex'} width={1}>
          <Box
            as={Paper}
            bgcolor={'common.white'}
            minHeight={'100vh'}
            variant={'outlined'}
            width={'300px'}
            ref={useAutoCallback((element) => {
              if (element) {
                setMenuContainer(element);
              }
            })}
          >
            <Navigation />
          </Box>
          <MenuContext.Provider value={menuContainer}>
            <TutorialEditor />
            <TutorialTooltip anchor={'#introduction'} />
            <TutorialTooltip anchor={'#layout'} />
          </MenuContext.Provider>
        </Box>
      </TutorialProvider>
    </ThemeProvider>
  );
}

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
  Paper,
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
  DeleteConfirmationDialog,
  deviceSelector,
  Editor,
  EditorActionButton,
  EditorActionIconButton,
  EditorContent,
  EditorDesign,
  EditorItemMenu,
  EditorToolbar,
  EditorTree,
  EditorTreeItem,
  ItemDesign,
  LayoutDesign,
  MenuButton,
  RichTextDesign,
  SidebarHeading,
  SidebarInput,
  SidebarSection,
  SidebarSelect,
  TableDesign,
  ToolbarToggleButtonGroup,
  ToolbarToggleButton,
  useBlocksChange,
  useEditorSelector,
  ChartDesign,
  ChartElementColorButton,
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
function TutorialProvider({ children, scenario }: TutorialProviderProps) {
  const [index, setIndex] = React.useState(0);

  return (
    <TutorialContext.Provider
      value={useAutoMemo({
        next: () => {
          setIndex((index) =>
            index < scenario.length - 1 ? index + 1 : index
          );
        },
        ...scenario[index],
        index,
        length: scenario.length,
        find: (fn) => scenario.find(fn),
        back: () => setIndex(index - 1),
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
      disableFocusListener
      placement={manual.placement || 'bottom'}
      open={open}
      arrow
      title={
        <Box pointerEvents={'all'}>
          <Typography>{manual.tooltip}</Typography>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button
              color={'secondary'}
              size={'small'}
              onClick={() => {
                manual.back();
              }}
            >
              Back
            </Button>
            {(manual.showNext || manual.index === manual.length - 1) && (
              <Button
                color={'primary'}
                size={'small'}
                onClick={() => {
                  manual.next();
                }}
              >
                {manual.showNext ? 'next' : 'next tutorial'}
              </Button>
            )}
          </Box>
        </Box>
      }
      onClick={onClick}
      PopperProps={{
        popperOptions: { eventsEnabled: true },
      }}
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
function TutorialDesignButton({ name, onClick, ...props }) {
  const anchor = `design#button(name=${name})`;
  const manual = React.useContext(TutorialContext);
  return (
    <TutorialTooltip anchor={anchor}>
      <Button
        {...props}
        name={name}
        disabled={manual.anchor !== anchor}
        onClick={useAutoCallback((event) => {
          manual.next();
          onClick && onClick(event);
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
const TutorialDesignInput = ({ name, onChange, ...props }) => {
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
const TutorialDesignSelect = ({ name, onChange, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#select(name=${name})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <SidebarSelect
        {...props}
        disabled={anchor !== manual.anchor}
        name={name}
        onChange={useAutoCallback((event) => {
          if (
            'value' in manual &&
            (manual.value === event.target.value || manual.value === '*')
          ) {
            manual.next();
          }
          onChange && onChange(event);
        })}
      />
    </TutorialTooltip>
  );
};

// eslint-disable-next-line
const TutorialColorButton = (props) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#button(name=color)`;
  return (
    <TutorialTooltip anchor={anchor}>
      <ChartElementColorButton
        {...props}
        disabled={anchor !== manual.anchor}
        onChange={useAutoCallback((event) => {
          if (
            'value' in manual &&
            (manual.value === event.target.value || manual.value === '*')
          ) {
            event.target.setOpen(false);
            manual.next();
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
      inputAs={TutorialDesignInput}
      selectAs={TutorialDesignSelect}
    />
  );
};

// eslint-disable-next-line
const TutorialChartDesign = (props) => {
  return (
    <ChartDesign
      {...props}
      buttonAs={TutorialDesignButton}
      selectAs={TutorialDesignSelect}
      colorButtonAs={TutorialColorButton}
      inputAs={TutorialDesignInput}
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
        disabled={
          anchor !== manual.anchor &&
          !manual.anchor.startsWith(`design#toggle-button(name=${name}&`) &&
          !/^design#.+-section$/.test(manual.anchor)
        }
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

const TutorialToggleButton = ({ name, value, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#toggle-button(name=${name}&value=${value})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <ToolbarToggleButton
        {...props}
        name={name}
        disabled={
          anchor !== manual.anchor &&
          manual.anchor !== `design#toggle(name=${name})` &&
          !/^design#.+-section$/.test(manual.anchor)
        }
        value={value}
        onClick={useAutoCallback((event, value) => {
          if ('value' in manual && manual.value === value) {
            manual.next();
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
      toggleButtonAs={TutorialToggleButton}
      toggleAs={TutorialToggle}
      inputAs={TutorialDesignInput}
      selectAs={TutorialDesignSelect}
      sectionAs={TutorialSection}
    />
  );
};

// eslint-disable-next-line
const TutorialRichTextDesign = (props) => {
  return (
    <RichTextDesign
      {...props}
      toggleAs={TutorialToggle}
      toggleButtonAs={TutorialToggleButton}
      sectionAs={TutorialSection}
    />
  );
};

const TutorialActionIconButton = ({ value, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#action-button(value=${value})`;
  return (
    <TutorialTooltip anchor={anchor}>
      <EditorActionIconButton
        {...props}
        disabled={anchor !== manual.anchor}
        value={value}
        onClick={useAutoCallback(() => {
          manual.next();
        })}
      />
    </TutorialTooltip>
  );
};

const TutorialSection = ({ id, ...props }) => {
  const manual = React.useContext(TutorialContext);
  const anchor = `design#${id}`;
  return (
    <TutorialTooltip anchor={anchor}>
      <SidebarSection {...props} id={id} disabled={anchor !== manual.anchor} />
    </TutorialTooltip>
  );
};

// eslint-disable-next-line
const TutorialTableDesign = (props) => {
  return (
    <TableDesign
      {...props}
      actionIconButtonAs={TutorialActionIconButton}
      sectionAs={TutorialSection}
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

type Props = {
  scenario: Array<{
    anchor: string,
    tooltip: string,
  }>,
};

// eslint-disable-next-line
const SideBarContext = React.createContext({
  current: null,
});

// eslint-disable-next-line
function SideBarExtension({ children }) {
  const container = React.useContext(SideBarContext);
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
      <SideBarExtension>
        <SidebarSection pl={2}>
          <SidebarHeading>Structure</SidebarHeading>
          <EditorTree itemAs={TutorialTreeItem} />
        </SidebarSection>
        <Box pl={2}>
          <EditorDesign
            richTextDesignAs={TutorialRichTextDesign}
            itemDesignAs={TutorialItemDesign}
            layoutDesignAs={TutorialLayoutDesign}
            tableDesignAs={TutorialTableDesign}
            chartDesignAs={TutorialChartDesign}
          />
        </Box>
      </SideBarExtension>
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

const SideBar = styled(Box).attrs({
  as: Paper,
  bgcolor: 'common.white',
  minHeight: '100vh',
  variant: 'outlined',
  width: '300px',
})`
  .MuiStepLabel-iconContainer,
  .MuiStepLabel-labelContainer {
    cursor: pointer;
  }
`;

// eslint-disable-next-line
export default function Tutorial({ scenario, states, blocks }: Props) {
  const [sidebarContainer, setSidebarContainer] = React.useState(null);
  return (
    <ThemeProvider>
      <TutorialProvider scenario={scenario} states={states}>
        <Box display={'flex'} width={1}>
          <SideBar
            ref={useAutoCallback((element) => {
              if (element) {
                setSidebarContainer(element);
              }
            })}
          />
          <SideBarContext.Provider value={sidebarContainer}>
            <Editor
              {...actions('onChange')}
              as={EditorView}
              blockRenderMap={blockRenderMap}
            >
              {blocks}
            </Editor>
            <TutorialTooltip anchor={'#introduction'} />
            <TutorialTooltip anchor={'#layout'} />
          </SideBarContext.Provider>
        </Box>
      </TutorialProvider>
    </ThemeProvider>
  );
}

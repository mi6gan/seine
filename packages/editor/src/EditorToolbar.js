// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import { ItemMenuContext } from './EditorItemMenu';
import {
  deviceSelector,
  EditorActionButton,
  pageSelector,
  useBlocksDispatch,
  useEditorSelector,
} from './blocks';
import {
  BlockTypeIcon,
  ToolbarSelect,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
} from './ui';
import { useSelectedLayoutIds } from './layouts';
import type { EditorActionButtonProps } from './blocks/EditorActionButton';
import { defaultPageEditor } from './pages/PageEditor';

import { AppBar } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';
import type { BoxProps } from '@seine/styles/mui-core.macro.d';
import { Menu as MenuIcon } from '@seine/styles/mui-icons.macro';
import {
  blockTypes,
  chartTypes,
  CREATE_BLOCK,
  createBlock,
  createBlockElements,
  createTitleIdentityBlockElements,
  defaultImageFormat,
  SET_DEVICE,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { defaultTableCell, toRawContent } from '@seine/content';

type Props = BoxProps & {
  actionButtonAs?: React.ComponentType<EditorActionButtonProps>,
};

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
const EditorToolbar = React.forwardRef(function EditorToolbar(
  {
    position = 'fixed',
    actionButtonAs: ActionButton = EditorActionButton,
    ...boxProps
  }: Props,
  ref
) {
  const menuAnchorRef = React.useRef(null);
  const itemMenu = React.useContext(ItemMenuContext);

  const [parentId = null] = useSelectedLayoutIds();

  const dispatch = useBlocksDispatch();
  const device = useEditorSelector(deviceSelector);
  const {
    id: pageId,
    editor: { scale } = defaultPageEditor,
  } = useEditorSelector(pageSelector);

  return (
    <AppBar position={position} ref={ref}>
      <Toolbar {...boxProps} ref={menuAnchorRef}>
        <Box width={'40%'}>
          <ToolbarButton
            onClick={useAutoCallback(() => {
              if (itemMenu) {
                itemMenu.open(menuAnchorRef.current);
              }
            })}
            selected={itemMenu.isOpen}
          >
            <MenuIcon />
          </ToolbarButton>

          {parentId !== null && <ToolbarSeparator />}

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(blockTypes.RICH_TEXT, toRawContent('Rich text'), {
                verticalAlignment: 'center',
              })
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.RICH_TEXT} />
          </ToolbarButton>

          {parentId !== null && <ToolbarSeparator />}

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(
                blockTypes.TABLE,
                {
                  header: [
                    { ...defaultTableCell, text: 'Column 1' },
                    { ...defaultTableCell, text: 'Column 2' },
                  ],
                  rows: [
                    [defaultTableCell, defaultTableCell],
                    [defaultTableCell, defaultTableCell],
                  ],
                },
                null
              )
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.TABLE} />
          </ToolbarButton>

          {parentId !== null && <ToolbarSeparator />}

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(
                blockTypes.CHART,
                {
                  elements: createTitleIdentityBlockElements([
                    {
                      title: 'First item',
                      value: 30,
                    },
                    {
                      title: 'Second item',
                      value: 70,
                    },
                  ]),
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.BAR,
                }
              )
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.BAR} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(
                blockTypes.CHART,
                {
                  elements: createTitleIdentityBlockElements([
                    {
                      title: 'Top',
                      value: 100,
                      group: 'group 1',
                    },
                    {
                      title: 'Bottom',
                      value: 10,
                      group: 'group 1',
                    },
                    {
                      title: 'Top',
                      value: 100,
                      group: 'group 2',
                    },
                    {
                      title: 'Bottom',
                      value: 10,
                      group: 'group 2',
                    },
                  ]),
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.LINE,
                }
              )
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.LINE} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(
                blockTypes.CHART,
                {
                  elements: createBlockElements([
                    {
                      title: 'First item',
                      group: 'Group 1',
                      value: 30,
                    },
                    {
                      title: 'Second item',
                      group: 'Group 1',
                      value: 70,
                    },
                    {
                      title: 'First item',
                      group: 'Group 2',
                      value: 40,
                    },
                    {
                      title: 'Second item',
                      group: 'Group 2',
                      value: 20,
                    },
                  ]),
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.COLUMN,
                }
              )
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.COLUMN} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(
                blockTypes.CHART,
                {
                  elements: [
                    {
                      title: 'First slice',
                      value: 30,
                    },
                    {
                      title: 'Second slice',
                      value: 70,
                    },
                  ],
                },
                {
                  verticalAlignment: 'center',
                  kind: chartTypes.PIE,
                }
              )
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.PIE} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(
                blockTypes.IMAGE,
                {
                  file:
                    'https://via.placeholder.com/150/0000FF/808080?text=empty%20image',
                },
                defaultImageFormat
              )
            )}
            id={parentId}
          >
            <BlockTypeIcon type={blockTypes.IMAGE} />
          </ToolbarButton>
        </Box>

        <Box width={'20%'} textAlign={'center'}>
          <ToolbarSelect
            native
            width={'5rem'}
            value={`${scale}`}
            onChange={useAutoCallback((event) =>
              dispatch({
                type: UPDATE_BLOCK_EDITOR,
                id: pageId,
                editor: { scale: +event.target.value },
              })
            )}
          >
            <option value={25}>25%</option>
            <option value={50}>50%</option>
            <option value={100}>100%</option>
            <option value={'auto'}>Fit</option>
          </ToolbarSelect>

          <ToolbarSelect
            native
            value={device}
            onChange={useAutoCallback((event) =>
              dispatch({ type: SET_DEVICE, device: event.target.value })
            )}
          >
            <option value={'any'}>Any device</option>
            <option value={'mobile'}>Mobile only</option>
          </ToolbarSelect>
        </Box>
        <Box width={'40%'} />
      </Toolbar>
    </AppBar>
  );
});

export default (EditorToolbar: React.ComponentType<Props>);

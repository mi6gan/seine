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
  Toolbar,
  ToolbarButton,
  ToolbarSelect,
  ToolbarSeparator,
} from './ui';
import { useSelectedContainerIds, useSelectedLayoutIds } from './layouts';
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
  shapeTypes,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { defaultTableCell, toRawContent } from '@seine/content';

type Props = BoxProps & {
  /** Container block CSS position value. */
  position?: 'static' | 'relative' | 'absolute' | 'fixed',
  /** Action button component. */
  actionButtonAs?: React.ComponentType<EditorActionButtonProps>,
};

/**
 * @description Default toolbar.
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

  const [layoutId = null] = useSelectedLayoutIds();
  const [containerId = null] = useSelectedContainerIds();

  const dispatch = useBlocksDispatch();
  const device = useEditorSelector(deviceSelector);
  const {
    id: pageId,
    editor: { scale } = defaultPageEditor,
  } = useEditorSelector(pageSelector);

  const createShape = useAutoCallback((event) => {
    const block = layoutId
      ? createBlock(
          blockTypes.SHAPE,
          {},
          { kind: shapeTypes.ROOT },
          containerId
        )
      : null;
    if (block) {
      dispatch({
        type: CREATE_BLOCK,
        block,
      });
    }
    dispatch({
      type: CREATE_BLOCK,
      block: createBlock(
        blockTypes.SHAPE,
        {},
        { kind: event.currentTarget.value },
        block ? block.id : containerId
      ),
    });
  });

  return (
    <AppBar position={position} ref={ref}>
      <Toolbar
        {...boxProps}
        ref={menuAnchorRef}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box flexGrow={0.25}>
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

          <ToolbarSeparator />

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(blockTypes.RICH_TEXT, toRawContent('Rich text'), {
                verticalAlignment: 'center',
              })
            )}
            id={layoutId}
            title={'Text'}
          >
            <BlockTypeIcon type={blockTypes.RICH_TEXT} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
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
            id={layoutId}
          >
            <BlockTypeIcon type={blockTypes.IMAGE} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
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
            id={layoutId}
            title={'Table'}
          >
            <BlockTypeIcon type={blockTypes.TABLE} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
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
            id={layoutId}
            title={'Bar chart'}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.BAR} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
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
            id={layoutId}
            title={'Line chart'}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.LINE} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
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
            id={layoutId}
            title={'Column chart'}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.COLUMN} />
          </ToolbarButton>

          <ToolbarButton
            as={ActionButton}
            disabled={layoutId === null}
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
            id={layoutId}
          >
            <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.PIE} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            disabled={containerId === null}
            value={shapeTypes.ELLIPSE}
            onClick={createShape}
          >
            <BlockTypeIcon type={blockTypes.SHAPE} kind={shapeTypes.ELLIPSE} />
          </ToolbarButton>

          <ToolbarButton
            disabled={containerId === null}
            value={shapeTypes.RECT}
            onClick={createShape}
          >
            <BlockTypeIcon type={blockTypes.SHAPE} kind={shapeTypes.RECT} />
          </ToolbarButton>

          <ToolbarButton
            disabled={containerId === null}
            value={shapeTypes.PATH}
            onClick={createShape}
          >
            <BlockTypeIcon type={blockTypes.SHAPE} kind={shapeTypes.PATH} />
          </ToolbarButton>
        </Box>

        <Box flexGrow={0.75}>
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
            <option value={125}>125%</option>
            <option value={150}>150%</option>
            <option value={200}>200%</option>
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
            <option value={'tablet'}>Tablet only</option>
            <option value={'desktop'}>Desktop only</option>
          </ToolbarSelect>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

EditorToolbar.name = 'EditorToolbar';

export default (EditorToolbar: React.ComponentType<Props>);

// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import { ItemMenuContext } from './EditorItemMenu';
import {
  deviceSelector,
  EditorActionButton,
  useBlocksDispatch,
  useEditorSelector,
} from './blocks';
import { Toolbar, BlockTypeIcon, ToolbarButton, ToolbarSeparator } from './ui';
import { useSelectedLayoutIds } from './layouts';

import { AppBar, MenuItem, Select } from '@seine/styles/mui-core.macro';
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
} from '@seine/core';
import { defaultTableCell, toRawContent } from '@seine/content';

const StyledSelect = styled(Select)`
  && {
    color: ${({ theme }) => theme.palette.grey[50]}};
  }
`;
type Props = BoxProps;

/**
 * @description Default content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
const EditorToolbar = React.forwardRef(function EditorToolbar(
  { position = 'fixed', ...boxProps }: Props,
  ref
) {
  const menuAnchorRef = React.useRef(null);
  const itemMenu = React.useContext(ItemMenuContext);

  const [parentId = null] = useSelectedLayoutIds();

  const dispatch = useBlocksDispatch();
  const device = useEditorSelector(deviceSelector);

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
          <ToolbarSeparator />

          <ToolbarButton
            as={EditorActionButton}
            disabled={parentId === null}
            type={CREATE_BLOCK}
            block={useAutoMemo(
              createBlock(blockTypes.RICH_TEXT, toRawContent('Rich text'), {
                verticalAlignment: 'center',
              })
            )}
            id={parentId}
            data-create={'rich-text'}
          >
            <BlockTypeIcon type={blockTypes.RICH_TEXT} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            as={EditorActionButton}
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

          <ToolbarSeparator />

          <ToolbarButton
            as={EditorActionButton}
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
            as={EditorActionButton}
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
            as={EditorActionButton}
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
            as={EditorActionButton}
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
            as={EditorActionButton}
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
          <StyledSelect
            value={device}
            onChange={useAutoCallback((event) =>
              dispatch({ type: SET_DEVICE, device: event.target.value })
            )}
          >
            <MenuItem value={'any'}>Any device</MenuItem>
            <MenuItem value={'mobile'}>Mobile only</MenuItem>
          </StyledSelect>
        </Box>
        <Box width={'40%'} />
      </Toolbar>
    </AppBar>
  );
});
export default EditorToolbar;

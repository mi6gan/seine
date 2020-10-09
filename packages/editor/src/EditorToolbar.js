// @flow
import * as React from 'react';
import type { BoxProps } from '@material-ui/core';
import { Box, MenuItem, Select } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import styled from 'styled-components/macro';

import ActionButton from './ui/ActionButton';
import { ItemMenuContext } from './EditorItemMenu';
import { deviceSelector } from './selectors';
import Toolbar from './ui/Toolbar';
import ToolbarButton from './ui/ToolbarButton';
import ToolbarSeparator from './ui/ToolbarSeparator';
import { useBlocksDispatch, useBlocksSelector } from './context';
import { BlockTypeIcon } from './ui';

import type { Block } from '@seine/core';
import {
  blockTypes,
  chartTypes,
  CREATE_BLOCK,
  createBlock,
  createTitleIdentityBlockElements,
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
 * @param {Props} boxProps
 * @returns {React.Node}
 */
export default function EditorToolbar(boxProps: Props) {
  const menuAnchorRef = React.useRef(null);
  const itemMenu = React.useContext(ItemMenuContext);

  const [block = null, ...nextBlocks]: [Block] = useBlocksSelector(
    useAutoCallback(({ blocks, selection }) =>
      blocks.filter(({ id }) => selection.includes(id))
    )
  );
  const isContainer =
    block &&
    nextBlocks.length === 0 &&
    (block.type === blockTypes.LAYOUT || block.type === blockTypes.PAGE);

  const dispatch = useBlocksDispatch();
  const device = useBlocksSelector(deviceSelector);

  return (
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
          as={ActionButton}
          disabled={!isContainer}
          type={CREATE_BLOCK}
          block={useAutoMemo(
            createBlock(blockTypes.RICH_TEXT, toRawContent('Rich text'), {
              verticalAlignment: 'center',
            })
          )}
          id={block && block.id}
        >
          <BlockTypeIcon type={blockTypes.RICH_TEXT} />
        </ToolbarButton>

        <ToolbarSeparator />

        <ToolbarButton
          as={ActionButton}
          disabled={!isContainer}
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
          id={block && block.id}
        >
          <BlockTypeIcon type={blockTypes.TABLE} />
        </ToolbarButton>

        <ToolbarSeparator />

        <ToolbarButton
          as={ActionButton}
          disabled={!isContainer}
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
          id={block && block.id}
        >
          <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.BAR} />
        </ToolbarButton>

        <ToolbarButton
          as={ActionButton}
          disabled={!isContainer}
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
          id={block && block.id}
        >
          <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.LINE} />
        </ToolbarButton>

        <ToolbarButton
          as={ActionButton}
          disabled={!isContainer}
          type={CREATE_BLOCK}
          block={useAutoMemo(
            createBlock(
              blockTypes.CHART,
              {
                elements: createTitleIdentityBlockElements([
                  {
                    title: 'First item',
                    group: 'Group 1',
                    value: 30,
                  },
                  {
                    title: 'Second item',
                    group: 'Group 2',
                    value: 70,
                  },
                  {
                    title: 'First item',
                    group: 'Group 1',
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
          id={block && block.id}
        >
          <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.COLUMN} />
        </ToolbarButton>

        <ToolbarButton
          as={ActionButton}
          disabled={!isContainer}
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
          id={block && block.id}
        >
          <BlockTypeIcon type={blockTypes.CHART} kind={chartTypes.PIE} />
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
  );
}

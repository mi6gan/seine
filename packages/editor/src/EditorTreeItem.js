// @flow
import { useAutoCallback } from 'hooks.macro';
import * as React from 'react';
import styled from 'styled-components/macro';

import { ItemMenuContext } from './EditorItemMenu';
import BlockTypeIcon from './ui/BlockTypeIcon';
import {
  selectionSelector,
  useBlocksDispatch,
  useEditorSelector,
} from './blocks';
import { ClipboardContext } from './clipboard';

import { ChevronRight, ExpandMore } from '@seine/styles/mui-icons.macro';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@seine/styles/mui-core.macro';
import {
  createBlocksAction,
  isBlockLayout,
  MOVE_BLOCK,
  SET_BLOCKS_SELECTION,
} from '@seine/core';
import { Box } from '@seine/styles';

type Props = {
  id?: string,
  expanded: boolean,
  onExpand: (SyntheticInputEvent) => any,
};

export type { Props as EditorTreeItemProps };

const StyledListItem = styled(ListItem)`
  &.MuiListItem-root {
    padding-left: ${({ level, theme }) => theme.spacing(level)}px;
    position: relative;
  }
`;

/**
 * @description Editor blocks tree item view.
 * @param {Props} props
 * @returns {React.Node}
 */
const EditorTreeItem = React.forwardRef(function EditorTreeItem(
  { id = null, expanded, onExpand, onClick, ...listItemProps }: Props,
  ref
) {
  const dispatch = useBlocksDispatch();
  const selection = useEditorSelector(selectionSelector);
  const [blockIndex, block] = useEditorSelector(
    useAutoCallback(({ blocks }) => {
      const index = id ? blocks.findIndex((block) => id === block.id) : -1;
      return [index, blocks[index]];
    })
  );
  const itemMenu = React.useContext(ItemMenuContext);
  const openItemMenu = useAutoCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    itemMenu.open(event.currentTarget);
  });
  const isLayout = block && isBlockLayout(block);

  const clipboard = React.useContext(ClipboardContext);

  const dragOver = useAutoCallback((event) => {
    event.preventDefault();
    if (clipboard.type === MOVE_BLOCK) {
      clipboard.replace({
        ...clipboard.toJSON(),
        ...event.currentTarget.dataset,
      });
    }
  });

  return (
    <>
      <StyledListItem
        {...listItemProps}
        ref={ref}
        dense
        button
        draggable={blockIndex > 0}
        onDragStart={useAutoCallback(() => {
          clipboard.push(createBlocksAction(MOVE_BLOCK, {}, id));
        })}
        onDragEnd={useAutoCallback(() => {
          if (
            clipboard.type === MOVE_BLOCK &&
            clipboard.targetId &&
            clipboard.position
          ) {
            dispatch(clipboard.toJSON());
          }
          clipboard.pop();
        })}
        selected={selection.includes(id)}
        onClick={useAutoCallback((event) => {
          event.preventDefault();
          event.stopPropagation();
          dispatch({
            type: SET_BLOCKS_SELECTION,
            selection:
              event.shiftKey || event.ctrlKey
                ? selection.includes(id)
                  ? selection.filter((block) => id !== block.id)
                  : [...selection, id]
                : [id],
          });
          onClick && onClick(event);
        })}
        onContextMenu={openItemMenu}
        alignItems={'center'}
      >
        <ListItemIcon>
          <BlockTypeIcon
            type={block.type}
            {...(block.format &&
              block.format.kind && { kind: block.format.kind })}
            titleAccess={block.type}
          />
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography variant={'caption'}>
            {process.env.NODE_ENV === 'test'
              ? block.type
              : id
              ? id.slice(0, 6)
              : block.type}
          </Typography>
        </ListItemText>
        {blockIndex > 0 && (
          <Box
            data-position={'before'}
            data-target-id={process.env.NODE_ENV === 'test' ? 'mock' : id}
            position={'absolute'}
            width={1}
            height={1 / 2}
            top={0}
            onDragOver={dragOver}
            zIndex={
              clipboard.type === MOVE_BLOCK && clipboard.id !== id ? 1 : -1
            }
            borderTop={
              clipboard.type === MOVE_BLOCK &&
              clipboard.targetId === id &&
              clipboard.position === 'before'
                ? 1
                : 0
            }
            borderColor={'common.black'}
          />
        )}
        {blockIndex > 0 && (
          <Box
            data-position={'after'}
            data-target-id={process.env.NODE_ENV === 'test' ? 'mock' : id}
            position={'absolute'}
            width={1}
            height={1 / 2}
            bottom={0}
            onDragOver={dragOver}
            zIndex={
              clipboard.type === MOVE_BLOCK && clipboard.id !== id ? 1 : -1
            }
            borderBottom={
              clipboard.type === MOVE_BLOCK &&
              clipboard.targetId === id &&
              clipboard.position === 'after'
                ? 1
                : 0
            }
            borderColor={'common.black'}
          />
        )}
        <ListItemSecondaryAction>
          <IconButton
            size={'small'}
            component={Box}
            {...(!isLayout && { display: 'none' })}
            onClick={useAutoCallback((event) => {
              event.preventDefault();
              event.stopPropagation();
              onExpand(event);
            })}
          >
            {expanded ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </ListItemSecondaryAction>
      </StyledListItem>
    </>
  );
});

export default EditorTreeItem;

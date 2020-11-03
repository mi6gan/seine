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

import { ChevronRight, ExpandMore } from '@seine/styles/mui-icons.macro';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@seine/styles/mui-core.macro';
import { isBlockContainer, SET_BLOCKS_SELECTION } from '@seine/core';
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
  const block = useEditorSelector(
    useAutoCallback(
      ({ blocks }) => id && blocks.find((block) => id === block.id)
    )
  );
  const itemMenu = React.useContext(ItemMenuContext);
  const openItemMenu = useAutoCallback((event) => {
    if (!selection.includes(id)) {
      dispatch({ type: SET_BLOCKS_SELECTION, selection: [...selection, id] });
    }
    event.preventDefault();
    itemMenu.open(event.currentTarget);
  });
  const isLayout = block && isBlockContainer(block);

  return (
    <StyledListItem
      {...listItemProps}
      ref={ref}
      dense
      button
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
          {...block.format}
          titleAccess={block.type}
        />
      </ListItemIcon>
      <ListItemText disableTypography>
        <Typography variant={'caption'}>
          {id ? id.slice(0, 6) : block.type}
        </Typography>
      </ListItemText>
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
  );
});

export default EditorTreeItem;

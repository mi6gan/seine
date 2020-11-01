// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { ItemMenuContext } from './EditorItemMenu';
import {
  selectionSelector,
  useBlocksDispatch,
  useEditorSelector,
} from './blocks';
import BlockTypeIcon from './ui/BlockTypeIcon';

import { Box } from '@seine/styles';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@seine/styles/mui-core.macro';
import { ChevronRight, ExpandMore } from '@seine/styles/mui-icons.macro';
import { isBlockContainer, SET_BLOCKS_SELECTION } from '@seine/core';

type Props = {
  as?: React.ComponentType,
  id?: null | string,
};

const StyledListItem = styled(ListItem)`
  &.MuiListItem-root {
    padding-left: ${({ level, theme }) => theme.spacing(level)}px;
  }
`;

// eslint-disable-next-line
function EditorTreeItem({
  id = null,
  expanded,
  onExpand,
  ...listItemProps
}: Props) {
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
      <span data-tree={'block'} />
    </StyledListItem>
  );
}

const StyledList = styled(List).attrs({
  disablePadding: true,
})`
  width: 100%;
`;

/**
 * @description Editor blocks tree view.
 * @param {Props} props
 * @returns {React.Node}
 */
function EditorTree({ id = null, level = 0 }: Props) {
  const children = useEditorSelector(
    useAutoCallback((state) =>
      state.blocks.filter((block) => block['parent_id'] === id)
    )
  );
  const [expanded, setExpanded] = React.useState(true);
  const toggleExpand = useAutoCallback(() => {
    setExpanded(!expanded);
  });

  return (
    <>
      {id && (
        <EditorTreeItem
          id={id}
          onExpand={toggleExpand}
          expanded={expanded}
          level={level}
        />
      )}
      <StyledList>
        {expanded &&
          children.length > 0 &&
          children.map(({ id }) => (
            <EditorTree key={id} id={id} level={level + 1} />
          ))}
      </StyledList>
    </>
  );
}

export default EditorTree;

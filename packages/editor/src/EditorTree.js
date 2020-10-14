// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { TreeItem, TreeView } from '@material-ui/lab';

import { ItemMenuContext } from './EditorItemMenu';
import {
  useBlocksDispatch,
  useBlocksSelector,
  selectionSelector,
} from './blocks';
import BlockTypeIcon from './ui/BlockTypeIcon';

import { Box } from '@seine/styles/mui-core.macro';
import { ChevronRight, ExpandMore } from '@seine/styles/mui-icons.macro';
import { DESELECT_ALL_BLOCKS, SELECT_BLOCK } from '@seine/core';

type Props = {
  as?: React.ComponentType,
  root?: null | string,
};

const isExpandEvent = (event) => {
  const target = event.target.viewportElement || event.target;
  return target.dataset['toggle'];
};

const DefaultTreeView = styled(({ children, ...viewProps }) => {
  const dispatch = useBlocksDispatch();
  const selection = useBlocksSelector(selectionSelector);
  const [expanded, setExpanded] = React.useState(
    useBlocksSelector(
      useAutoCallback((state) => state.blocks.map(({ id }) => id))
    )
  );

  return (
    <TreeView
      {...viewProps}
      multiSelect
      defaultExpandIcon={<ChevronRight data-toggle={true} />}
      defaultCollapseIcon={<ExpandMore data-toggle={true} />}
      expanded={expanded}
      selected={selection}
      onNodeToggle={useAutoCallback((event: SyntheticInputEvent, nodeIds) => {
        event.stopPropagation();
        event.preventDefault();
        if (isExpandEvent(event)) {
          setExpanded(nodeIds);
        }
      })}
      onNodeSelect={useAutoCallback((event: SyntheticInputEvent, nodeIds) => {
        event.stopPropagation();
        event.preventDefault();
        if (!isExpandEvent(event)) {
          dispatch({ type: DESELECT_ALL_BLOCKS });
          nodeIds.forEach((id) =>
            dispatch({
              type: SELECT_BLOCK,
              id,
              modifier: event.ctrlKey || event.shiftKey ? 'add' : null,
            })
          );
        }
      })}
    >
      {children}
    </TreeView>
  );
})`
  width: 100%;
`;

/**
 * @description Editor blocks tree view.
 * @param {Props} props
 * @returns {React.Node}
 */
function EditorTree({
  as: Tree = DefaultTreeView,
  labelAs: Label = 'span',
  root = null,
  ...treeProps
}: Props) {
  const dispatch = useBlocksDispatch();
  const selection = useBlocksSelector(selectionSelector);
  const itemMenu = React.useContext(ItemMenuContext);
  const openItemMenu = useAutoCallback((event) => {
    const { id } = event.currentTarget.dataset;
    if (!selection.includes(id)) {
      dispatch({ type: SELECT_BLOCK, id });
    }
    event.preventDefault();
    itemMenu.open(event.currentTarget);
  });

  return (
    <Tree {...treeProps}>
      {useBlocksSelector(
        useAutoCallback((state) =>
          state.blocks.filter((block) => block['parent_id'] === root)
        )
      ).map(({ id, type, format }) => (
        <EditorTree
          as={TreeItem}
          root={id}
          key={id}
          nodeId={id}
          labelAs={Label}
          label={
            <Box
              display={'flex'}
              width={1}
              justifyContent={'space-between'}
              alignItems={'center'}
              px={1}
            >
              <Label onContextMenu={openItemMenu} data-id={id}>
                {id ? id.slice(0, 6) : type}
              </Label>
              <BlockTypeIcon type={type} {...format} />
            </Box>
          }
        />
      ))}
    </Tree>
  );
}

export default EditorTree;

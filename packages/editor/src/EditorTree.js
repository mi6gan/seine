// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { TreeItem, TreeView } from '@material-ui/lab';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import { Box } from '@material-ui/core';

import { useBlocksDispatch, useBlocksSelector } from './context';
import BlockTypeIcon from './ui/BlockTypeIcon';

import { DESELECT_ALL_BLOCKS, SELECT_BLOCK } from '@seine/core';

type Props = {
  as?: React.ComponentType,
  root?: null | string,
};

const DefaultTreeView = styled(({ children, ...viewProps }) => {
  const dispatch = useBlocksDispatch();
  const selection = useBlocksSelector((state) => state.selection);
  return (
    <TreeView
      {...viewProps}
      multiSelect
      selected={selection}
      defaultExpandIcon={<ChevronRight />}
      defaultCollapseIcon={<ExpandMore />}
      defaultExpanded={useBlocksSelector(
        useAutoCallback((state) => state.blocks.map(({ id }) => id))
      )}
      onNodeSelect={useAutoCallback((event, nodeIds) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch({ type: DESELECT_ALL_BLOCKS });
        nodeIds.forEach((id) =>
          dispatch({
            type: SELECT_BLOCK,
            id,
            modifier: event.ctrlKey ? 'add' : null,
          })
        );
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
  labelAs: Label = React.Fragment,
  root = null,
  ...treeProps
}: Props) {
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
              {id && <Label>{id.slice(0, 6)}</Label>}
              <BlockTypeIcon type={type} {...format} />
            </Box>
          }
        />
      ))}
    </Tree>
  );
}

export default EditorTree;

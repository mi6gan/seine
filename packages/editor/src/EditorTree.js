// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { useEditorSelector } from './blocks';
import type { EditorTreeItemProps } from './EditorTreeItem';
import EditorTreeItem from './EditorTreeItem';

import { List } from '@seine/styles/mui-core.macro';

const StyledList = styled(List).attrs({
  disablePadding: true,
})`
  width: 100%;
`;

type Props = {
  as?: React.ComponentType,
  id?: null | string,
  itemAs?: React.ComponentType<EditorTreeItemProps>,
};

/**
 * @description Default blocks tree view.
 * @param {Props} props
 * @returns {React.Node}
 */
function EditorTree({
  id = null,
  level = 0,
  itemAs: Item = EditorTreeItem,
}: Props) {
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
        <Item
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
            <EditorTree key={id} id={id} level={level + 1} itemAs={Item} />
          ))}
      </StyledList>
    </>
  );
}

export default EditorTree;

// @flow
import * as React from 'react';
import { Grid } from '@seine/content';
import { useAutoMemo } from 'hooks.macro';

import Frame from '../ui/Frame';

/**
 * @description Table block editor.
 * @param {any} props
 * @returns {React.Node}
 */
export default function GridEditor({
  id,
  dispatch,
  selection,
  children,
  ...flexProps
}) {
  const blockIds = useAutoMemo([
    id,
    ...(children && children.props && Array.isArray(children.props.children)
      ? children.props.children.map(({ id }) => id)
      : []),
  ]);
  const selected = useAutoMemo(blockIds.some((id) => selection.includes(id)));
  return (
    <Frame
      as={Grid}
      {...flexProps}
      {...(selected && { borderStyle: 'dashed' })}
      dispatch={dispatch}
      id={id}
      selected={selected}
    >
      {children}
    </Frame>
  );
}

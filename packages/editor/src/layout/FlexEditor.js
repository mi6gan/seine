// @flow
import * as React from 'react';
import { Flex } from '@seine/content';
import { useAutoMemo } from 'hooks.macro';

import Frame from '../ui/Frame';

/**
 * @description Flex layout editor.
 * @param {any} props
 * @returns {React.Node}
 */
export default function FlexEditor({
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
      as={Flex}
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

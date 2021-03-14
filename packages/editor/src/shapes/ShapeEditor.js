// @flow
import * as React from 'react';

import { Frame } from '../ui';
import { useEditorSelector } from '../blocks';
import GroupShape from '../../../content/src/shapes/GroupShape';

import PathFrame from './PathFrame';
import EllipseFrame from './EllipseFrame';
import RectFrame from './RectFrame';

import { Shape, useBlockChildren } from '@seine/content';
import { shapeTypes } from '@seine/core';

const ShapeEditorRoot = React.forwardRef(function ShapeEditor(
  { id, ...props },
  ref
) {
  const children = useBlockChildren(id);
  const childSelected = useEditorSelector(({ blocks }) =>
    blocks.some((block) => children.some(({ id }) => block.id === id))
  );
  return (
    <Frame {...props} id={id} as={Shape} ref={ref} selected={childSelected} />
  );
});

// eslint-disable-next-line
const ShapeEditor = React.forwardRef(function ShapeEditor(props, ref) {
  return props.kind === shapeTypes.ROOT ? (
    <ShapeEditorRoot {...props} ref={ref} />
  ) : props.kind === shapeTypes.PATH ? (
    <PathFrame {...props} ref={ref} />
  ) : props.kind === shapeTypes.ELLIPSE ? (
    <EllipseFrame {...props} ref={ref} />
  ) : props.kind === shapeTypes.RECT ? (
    <RectFrame {...props} ref={ref} />
  ) : props.kind === shapeTypes.GROUP ? (
    <GroupShape {...props} ref={ref} />
  ) : null;
});

export default ShapeEditor;

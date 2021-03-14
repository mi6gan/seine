// @flow
import * as React from 'react';

import RootShape from './RootShape';
import GroupShape from './GroupShape';
import PathShape from './PathShape';
import RectShape from './RectShape';
import EllipseShape from './EllipseShape';

import type { ShapeBody, ShapeFormat } from '@seine/core';
import { shapeTypes } from '@seine/core';

export type Props = ShapeBody & ShapeFormat;

const Shape = React.forwardRef(function Shape(
  {
    kind,
    parentType,
    strokeWidth,
    stroke,
    fill,
    transform,
    children = null,
    ...shapeProps
  }: Props,
  ref
) {
  const styleProps = { strokeWidth, stroke, fill, transform };
  return kind === shapeTypes.ROOT ? (
    <RootShape {...shapeProps} ref={ref}>
      <g {...styleProps}>{children}</g>
    </RootShape>
  ) : kind === shapeTypes.GROUP ? (
    <GroupShape {...shapeProps} {...styleProps} ref={ref}>
      {children}
    </GroupShape>
  ) : (
    <g {...styleProps}>
      ) : kind === shapeTypes.PATH ? (
      <PathShape {...shapeProps} ref={ref} />
      ) : kind === shapeTypes.RECT ? (
      <RectShape {...shapeProps} ref={ref} />
      ) : kind === shapeTypes.ELLIPSE ? (
      <EllipseShape {...shapeProps} ref={ref} />) : null}
      {children}
    </g>
  );
});

/**
 * @description Shape block default render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default Shape;

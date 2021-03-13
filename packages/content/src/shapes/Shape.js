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
  return (
    <g
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={fill}
      transform={transform}
    >
      {kind === shapeTypes.ROOT ? (
        <RootShape {...shapeProps} ref={ref}>
          {children}
        </RootShape>
      ) : kind === shapeTypes.GROUP ? (
        <GroupShape {...shapeProps} ref={ref} />
      ) : kind === shapeTypes.PATH ? (
        <PathShape {...shapeProps} ref={ref} />
      ) : kind === shapeTypes.RECT ? (
        <RectShape {...shapeProps} ref={ref} />
      ) : kind === shapeTypes.ELLIPSE ? (
        <EllipseShape {...shapeProps} ref={ref} />
      ) : null}
      {kind !== shapeTypes.ROOT && children}
    </g>
  );
});

/**
 * @description Shape block default render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default Shape;

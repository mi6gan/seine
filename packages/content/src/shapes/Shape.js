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

/**
 * @description Shape block default render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Shape({ kind, parentType, ...shapeProps }: Props) {
  return kind === shapeTypes.ROOT ? (
    <RootShape {...shapeProps} />
  ) : kind === shapeTypes.GROUP ? (
    <GroupShape {...shapeProps} />
  ) : kind === shapeTypes.PATH ? (
    <PathShape {...shapeProps} />
  ) : kind === shapeTypes.RECT ? (
    <RectShape {...shapeProps} />
  ) : kind === shapeTypes.ELLIPSE ? (
    <EllipseShape {...shapeProps} />
  ) : null;
}

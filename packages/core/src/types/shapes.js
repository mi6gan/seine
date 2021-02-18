// @flow
import type { ItemFormat } from './layout';
import { defaultItemFormat } from './layout';

export const shapeTypes = {
  ROOT: 'root',
  GROUP: 'group',
  PATH: 'path',
  RECT: 'rect',
  ELLIPSE: 'ellipse',
};

export type ShapeBody = {
  plugin: string,
};

export type ShapeType = $Values<typeof shapeTypes>;

export type GroupFormat = ItemFormat & {
  kind: typeof shapeTypes.GROUP,
  transform: string,
};

export type RectFormat = ItemFormat & {
  kind: typeof shapeTypes.RECT,
  x: number,
  y: number,
  width: number,
  height: number,
};

export type EllipseFormat = ItemFormat & {
  kind: typeof shapeTypes.ELLIPSE,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
};

export type PathFormat = ItemFormat & {
  kind: typeof shapeTypes.PATH,
  d: string,
};

export type ShapeFormat =
  | ItemFormat
  | GroupFormat
  | RectFormat
  | EllipseFormat
  | PathFormat;

export const SHAPE = 'shape';

export const defaultPathShapeFormat = {
  kind: shapeTypes.PATH,
  d: '',
};

export const defaultRectShapeFormat = {
  kind: shapeTypes.RECT,
  x: 30,
  y: 30,
  width: 10,
  height: 10,
};

export const defaultEllipseShapeFormat = {
  kind: shapeTypes.ELLIPSE,
  cx: 30,
  cy: 30,
  rx: 5,
  ry: 5,
};

export const defaultShapeFormat = {
  ...defaultItemFormat,
  kind: shapeTypes.ROOT,
};

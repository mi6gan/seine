// @flow
import * as React from 'react';

import { useSelectedLayoutItems } from '../layouts';

import EllipseShapeDesign from './EllipseShapeDesign';

import { shapeTypes } from '@seine/core';

/**
 * @description Shape design panel.
 * @returns {React.Node}
 */
export default function ShapeDesign() {
  const {
    item: {
      format: { kind },
    },
  } = useSelectedLayoutItems();
  return kind === shapeTypes.ELLIPSE ? <EllipseShapeDesign /> : null;
}

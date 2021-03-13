// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useSelectedLayoutItems } from '../layouts';
import { useBlocksDispatch } from '../blocks';
import {
  ColorButton,
  SidebarHeading,
  SidebarLabel,
  SidebarSection,
} from '../ui';
import ConstraintInput from '../ui/ConstraintInput';

import EllipseShapeDesign from './EllipseShapeDesign';
import RectShapeDesign from './RectShapeDesign';

import { shapeTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { Box } from '@seine/styles';

/**
 * @description Shape design panel.
 * @returns {React.Node}
 */
export default function ShapeDesign() {
  const {
    item: {
      id,
      format: { kind, fill, stroke, strokeWidth },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Shape</SidebarHeading>
        <ColorButton
          label={'fill'}
          value={fill}
          onChange={useAutoCallback((event) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: { fill: event.target.value },
            });
          })}
        />
        <ColorButton
          label={'stroke'}
          value={stroke}
          onChange={useAutoCallback((event) => {
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: { stroke: event.target.value },
            });
          })}
        />
        <SidebarLabel>Stroke width</SidebarLabel>
        <Box display={'flex'} mr={1} as={'form'}>
          <ConstraintInput
            id={id}
            inputProps={{ placeholder: 'Stroke width', min: 0 }}
            name={'strokeWidth'}
            units={['pt', 'px']}
            value={strokeWidth}
          />
        </Box>
      </SidebarSection>
      {kind === shapeTypes.ELLIPSE ? <EllipseShapeDesign /> : null}
      {kind === shapeTypes.RECT ? <RectShapeDesign /> : null}
    </>
  );
}

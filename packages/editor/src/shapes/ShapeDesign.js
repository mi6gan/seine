// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { useSelectedLayoutItems } from '../layouts';
import { useBlocksDispatch } from '../blocks';
import { ColorButton, SidebarHeading, SidebarSection } from '../ui';

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
      format: { kind, fill, stroke },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Shape</SidebarHeading>
        <Box display={'flex'}>
          <ColorButton
            label={'fill'}
            value={fill}
            onChange={useAutoCallback((event) => {
              dispatch({
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
                type: UPDATE_BLOCK_FORMAT,
                format: { stroke: event.target.value },
              });
            })}
          />
        </Box>
      </SidebarSection>
      {kind === shapeTypes.ELLIPSE ? <EllipseShapeDesign /> : null}
      {kind === shapeTypes.RECT ? <RectShapeDesign /> : null}
    </>
  );
}

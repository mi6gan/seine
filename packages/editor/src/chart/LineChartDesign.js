// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';

import SidebarSection from '../ui/SidebarSection';
import SidebarHeading from '../ui/SidebarHeading';

import ChartStepInputGroup from './ChartStepInputGroup';
import ChartStructureGroup from './ChartStructureGroup';
import ChartElementColorButton from './ChartElementColorButton';
import useChartBlock from './useChartBlock';
import ChartPaletteSelect from './ChartPaletteSelect';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function LineChartDesign() {
  const { editor } = useChartBlock();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <ChartStepInputGroup hideX />
        <ChartPaletteSelect />
      </SidebarSection>
      {editor.selection > -1 && (
        <SidebarSection>
          <Box
            component={SidebarHeading}
            display={'flex'}
            justifyContent={'space-between'}
          >
            Element
            <ChartStructureGroup />
          </Box>
          <ChartElementColorButton />
        </SidebarSection>
      )}
    </>
  );
}

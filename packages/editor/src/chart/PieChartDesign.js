// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';

import ChartUnitsInput from './ChartUnitsInput';
import ChartPaletteSelect from './ChartPaletteSelect';
import useChartBlock from './useChartBlock';
import ChartElementColorButton from './ChartElementColorButton';
import ChartStructureGroup from './ChartStructureGroup';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function PieChartDesign() {
  const { editor } = useChartBlock();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <ChartUnitsInput />
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

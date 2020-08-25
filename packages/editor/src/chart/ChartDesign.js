// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';

import SidebarSection from '../ui/SidebarSection';
import SidebarHeading from '../ui/SidebarHeading';

import ChartUnitsInput from './ChartUnitsInput';
import ChartFractionInput from './ChartFractionInput';
import ChartPaletteSelect from './ChartPaletteSelect';
import ChartLegendSwitch from './ChartLegendSwitch';
import ChartStructureGroup from './ChartStructureGroup';
import ChartElementColorButton from './ChartElementColorButton';
import ChartStepInputGroup from './ChartStepInputGroup';
import ChartLimitsInput from './ChartLimitsInput';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <ChartUnitsInput />
        <ChartLimitsInput />
        <ChartStepInputGroup />
        <ChartFractionInput />
        <ChartPaletteSelect />
        <ChartLegendSwitch />
      </SidebarSection>
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
    </>
  );
}

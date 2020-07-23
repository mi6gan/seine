// @flow
import * as React from 'react';
import { Box, Checkbox } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import SidebarGroup from '../ui/SidebarGroup';
import SidebarLabel from '../ui/SidebarLabel';
import { useBlocksDispatch } from '../context';

import ChartUnitsInput from './ChartUnitsInput';
import ChartPaletteSelect from './ChartPaletteSelect';
import useChartBlock from './useChartBlock';
import ChartElementColorButton from './ChartElementColorButton';
import ChartStructureGroup from './ChartStructureGroup';
import ChartFractionInput from './ChartFractionInput';

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function PieChartDesign() {
  const {
    editor,
    format: { legend },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <ChartUnitsInput />
        <ChartFractionInput />
        <ChartPaletteSelect />
        <SidebarGroup alignItems={'center'}>
          <SidebarLabel>legend</SidebarLabel>
          <Checkbox
            checked={!!legend}
            onChange={useAutoCallback(() => {
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { legend: !legend },
              });
            })}
          />
        </SidebarGroup>
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
        {editor.selection > -1 && <ChartElementColorButton />}
      </SidebarSection>
    </>
  );
}

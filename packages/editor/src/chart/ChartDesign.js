// @flow
import * as React from 'react';
import { blockTypes, chartTypes } from '@seine/core';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import { useSelectedBlocks } from '../store';

import PieChartDesign from './PieChartDesign';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    format: { kind },
  } = useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        {kind === chartTypes.PIE && <PieChartDesign />}
      </SidebarSection>
    </>
  );
}

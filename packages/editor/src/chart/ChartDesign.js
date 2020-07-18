// @flow
import * as React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { blockTypes, chartTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultChartFormat } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import { useEditorDispatch, useSelectedBlocks } from '../store';

import PieChartDesign from './PieChartDesign';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    format: { legend = defaultChartFormat.legend, kind },
  } = useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  const dispatch = useEditorDispatch();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Chart</SidebarHeading>
        <FormControlLabel
          control={
            <Checkbox
              size={'small'}
              checked={legend}
              onChange={useAutoCallback(() =>
                dispatch({
                  type: UPDATE_BLOCK_FORMAT,
                  format: { legend: !legend },
                })
              )}
            />
          }
          label={'Show legend'}
        />
        {kind === chartTypes.PIE && <PieChartDesign />}
      </SidebarSection>
    </>
  );
}

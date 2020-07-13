// @flow
import * as React from 'react';
import { UPDATE_BLOCK_ELEMENT_BY_ID, blockTypes } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';
import { ChartLegend, defaultChartLegend } from '@seine/content';
import { InlineInput } from '@seine/ui';

import { useSelectedBlocks } from '../store';

import useDispatchElements from './useDispatchElements';

/**
 * @description Editor of bar chart titles.
 * @returns {React.Node}
 */
export default function ChartDescriptionEditor() {
  const dispatchElements = useDispatchElements();
  const selected = useSelectedBlocks().find(
    (block) => block.type === blockTypes.CHART
  );
  const legend = selected && (selected.format.legend || defaultChartLegend);
  const elements = selected && selected.body.elements;
  return (
    <ChartLegend
      elements={useAutoMemo(
        legend
          ? elements.map(({ id, title }) => ({
              title: (
                <InlineInput
                  key={id}
                  value={title}
                  onChange={({ currentTarget }) =>
                    dispatchElements({
                      type: UPDATE_BLOCK_ELEMENT_BY_ID,
                      body: { title: currentTarget.value },
                      id,
                    })
                  }
                />
              ),
            }))
          : []
      )}
    />
  );
}

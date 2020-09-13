// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import InlineInput from '../ui/InlineInput';

import type { ChartType } from '@seine/core/src/types';
import type { ChartLegendProps } from '@seine/content';
import { ChartLegend, defaultPieChartLegend } from '@seine/content';
import type { ElementsAction } from '@seine/core';
import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';

type Props = $Rest<ChartLegendProps, {| kind: ChartType |}> & {
  dispatchElements: (ElementsAction) => void,
  legend?: boolean,
};

/**
 * @description Editor of pie chart titles.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartDescriptionEditor({
  elements,
  legend = defaultPieChartLegend,
  dispatchElements,
  ...legendProps
}: Props) {
  return (
    <ChartLegend
      {...legendProps}
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

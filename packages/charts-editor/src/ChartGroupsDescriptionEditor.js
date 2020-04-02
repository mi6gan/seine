// @flow
import * as React from 'react';
import type { ChartType, ElementsAction } from '@seine/core';
import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';
import type { ChartLegendProps } from '@seine/charts';
import {
  ChartLegend,
  defaultChartLegend,
  titleIdentityElements,
} from '@seine/charts';
import { InlineInput } from '@seine/ui';

type Props = $Rest<ChartLegendProps, {| kind: ChartType |}> & {
  dispatchElements: (ElementsAction) => void,
  legend?: boolean,
};

/**
 * @description Legend editor of column chart groups.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartGroupsDescriptionEditor({
  elements,
  legend = defaultChartLegend,
  dispatchElements,
  ...legendProps
}: Props) {
  return (
    <ChartLegend
      {...legendProps}
      elements={
        legend
          ? titleIdentityElements(elements).map(({ id, title }) => ({
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
      }
    />
  );
}

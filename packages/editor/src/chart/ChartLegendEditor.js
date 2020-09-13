// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import InlineInput from '../ui/InlineInput';

import useChartDispatchElements from './useChartDispatchElements';

import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';
import { ChartLegend } from '@seine/content';

// eslint-disable-next-line
export default function ChartLegendEditor({ elements, ...legendProps }) {
  const dispatchElements = useChartDispatchElements();
  return (
    <ChartLegend
      {...legendProps}
      elements={useAutoMemo(
        elements.map(({ id, title }) => ({
          title: (
            <InlineInput
              key={id}
              value={title}
              size={title.length}
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
      )}
    />
  );
}

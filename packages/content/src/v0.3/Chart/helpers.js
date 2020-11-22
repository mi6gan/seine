// @flow
import {
  addIndex,
  append,
  converge,
  filter,
  groupBy,
  has,
  map,
  of,
  pipe,
  prepend,
  prop,
  reduce,
  reject,
  toPairs,
} from 'ramda';
import { useAutoMemo } from 'hooks.macro';

import type { ChartElement } from '@seine/core';

// eslint-disable-next-line
export const groupElements: (
  elements: ChartElement[]
) => $ReadOnlyArray<[?string, ChartElement[]]> = pipe(
  addIndex(map)((element, index) => ({ ...element, index })),

  converge(append, [
    /* take [null, elements] for ungrouped elements */
    pipe(reject(has('group')), of, prepend(null)),

    /* and [group, elements] for others */
    pipe(filter(has('group')), groupBy(prop('group')), toPairs),
  ]),

  reject(([_, { length }]) => length === 0)
);

export const titleIdentityElements: (
  elements: ChartElement[]
) => $ReadOnlyArray<{ id: string, title: string }> = reduce(
  (acc, { id, title }) =>
    !acc.some((element) => element.id === id) ? [...acc, { id, title }] : acc,
  []
);

// eslint-disable-next-line
export function useGroupedElements(
  elements,
  min,
  max,
  dy
): [number, number, *, *] {
  return useAutoMemo(() => {
    const maxValue =
      dy <= max ? max : Math.max(...elements.map(({ value }) => value));
    return [
      maxValue,
      maxValue > min ? min : Math.min(...elements.map(({ value }) => value)),
      titleIdentityElements(elements),
      groupElements(elements),
    ];
  });
}

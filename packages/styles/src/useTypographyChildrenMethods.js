// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import type { SvgTypographyMethods } from './SvgTypography';
import { defaultTypographyMethods } from './SvgTypography';

type Reducer = (
  acc: SvgTypographyMethods,
  elementMethods: SvgTypographyMethods
) => SvgTypographyMethods;

const defaultReducer: Reducer = (acc, methods: SvgTypographyMethods) =>
  methods && (!acc || methods.getWidth() >= acc.getWidth()) ? methods : acc;

/**
 * @description Use typography methods of a child with greatest width.
 * @param {number} count of children
 * @param {Reducer} reducer
 * @returns {[SvgTypographyMethods, React.Ref<SvgTypographyMethods>]}
 */
export default function useTypographyChildrenMethods(
  count,
  reducer = defaultReducer
) {
  const [methods, setMethods] = React.useState(defaultTypographyMethods);
  const { current: childrenMethods } = React.useRef([]);
  return useAutoMemo([
    methods,
    {
      set current(childMethods?: SvgTypographyMethods) {
        childrenMethods.push(childMethods);
        if (childrenMethods.length === count) {
          setMethods(childrenMethods.reduce(reducer, defaultTypographyMethods));
          childrenMethods.splice(0, childrenMethods.length);
        }
      },
      get current() {
        return methods;
      },
    },
  ]);
}

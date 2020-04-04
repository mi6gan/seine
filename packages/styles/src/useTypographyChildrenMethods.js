// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import type { SvgTypographyMethods } from './SvgTypography';
import { defaultTypographyMethods } from './SvgTypography';

type Reducer = (
  acc: SvgTypographyMethods,
  elementMethods: SvgTypographyMethods
) => SvgTypographyMethods;

const defaultReducer: Reducer = (acc, methods) =>
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
  const childrenMethodsRef = React.useRef([]);
  const { current: childrenMethods } = childrenMethodsRef;

  const [methods, setMethods] = React.useState(defaultTypographyMethods);
  const setCurrent = useAutoCallback((childMethods: ?SvgTypographyMethods) => {
    childrenMethods.push(childMethods);
    if (childrenMethods.length === count) {
      childrenMethodsRef.current = [];
      setMethods(childrenMethods.reduce(reducer, defaultTypographyMethods));
    }
  });

  return [
    methods,
    {
      set current(childMethods) {
        setCurrent(childMethods);
      },
      get current() {
        return methods;
      },
    },
  ];
}

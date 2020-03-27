// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import type { SvgTypographyMethods } from './SvgTypography';
import { defaultTypographyMethods } from './SvgTypography';

/**
 * @description Use typography methods of a child with greatest width.
 * @param {number} count of children
 * @returns {[SvgTypographyMethods, React.Ref<SvgTypographyMethods>]}
 */
export default function useTypographyChildrenMethods(count) {
  const childrenMethodsRef = React.useRef([]);
  const { current: childrenMethods } = childrenMethodsRef;

  const [methods, setMethods] = React.useState(defaultTypographyMethods);
  const setCurrent = useAutoCallback((childMethods: ?SvgTypographyMethods) => {
    childrenMethods.push(childMethods);
    if (childrenMethods.length === count) {
      childrenMethodsRef.current = [];
      setMethods(
        childrenMethods.reduce(
          (acc, methods: SvgTypographyMethods) =>
            methods && (!acc || methods.getWidth() >= acc.getWidth())
              ? methods
              : acc,
          defaultTypographyMethods
        )
      );
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

// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

/**
 * @description Use typography children as text string.
 * @param {React.ChildrenArray} children
 * @param {string} separator
 * @returns {string}
 */
export default function useTypographyChildren(
  children: React.ChildrenArray,
  separator = ' '
) {
  return useAutoMemo<string>(
    React.Children.toArray(children)
      .map(
        (child) =>
          `${
            typeof child === 'string' || typeof child === 'number'
              ? child
              : child && child.props && 'value' in child.props
              ? child.props.value
              : child &&
                (typeof child.props.children === 'string' ||
                  typeof child.props.children == 'number') &&
                child.props.fraction
              ? parseFloat(child.props.children).toLocaleString('en', {
                  maximumFractionDigits: child.props.fraction,
                  minimumFractionDigits: child.props.fraction,
                })
              : child.props.children || ''
          }`
      )
      .filter((child) => child)
      .join(separator)
  );
}

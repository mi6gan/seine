// @flow
import * as React from 'react';

type Props = {
  children: React.ChildrenArray<any>,
};

/**
 * @description Default page renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Page({ children }) {
  return children;
}

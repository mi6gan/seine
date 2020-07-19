// @flow
import * as React from 'react';
import type { LayoutBody, LayoutFormat } from '@seine/core';

import Flex from './Flex';
import Grid from './Grid';

type Props = LayoutFormat & LayoutBody;

/**
 * @description Layout content component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Layout({ kind, ...layoutProps }: Props) {
  if (kind === 'flex') {
    return <Flex {...layoutProps} />;
  }
  return <Grid {...layoutProps} />;
}

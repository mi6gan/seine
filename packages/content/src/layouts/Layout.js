// @flow
import * as React from 'react';

import Flex from './Flex';
import Grid from './Grid';

import type { LayoutBody, LayoutFormat } from '@seine/core';

type Props = LayoutFormat & LayoutBody;

export type { Props as LayoutProps };

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

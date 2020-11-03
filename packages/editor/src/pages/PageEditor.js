// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import { Paper } from '@seine/styles/mui-core.macro';
import { Page } from '@seine/content';
import type { LayoutProps } from '@seine/content';

type Props = LayoutProps & {
  scale?: number | 'auto',
};

export const defaultPageEditor = {
  scale: 'auto',
};

const PageFrame = styled(Paper).attrs({
  square: true,
})`
  && {
    padding: 0;
    width: 100%;
    min-height: 100%;
    ${({ scale }: Props) =>
      Number.isFinite(parseFloat(+scale)) && {
        transform: `scale(${scale}%)`,
      }}
  }
`;

/**
 * @description Image block default editor render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PageEditor({
  editor: { scale = defaultPageEditor.scale } = defaultPageEditor,
  ...pageProps
}: Props) {
  return (
    <PageFrame scale={scale}>
      <Page {...pageProps} />
    </PageFrame>
  );
}

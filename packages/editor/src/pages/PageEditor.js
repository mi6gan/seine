// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

import { useEditorSelector } from '../blocks';

import { Paper } from '@seine/styles/mui-core.macro';
import { Page } from '@seine/content';
import type { LayoutProps } from '@seine/content';

type Props = LayoutProps & {
  scale?: number | 'auto',
};

export const defaultPageEditor = {
  scale: 100,
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
    & > * {
      border: ${({ selected, theme }) =>
        `1px solid ${selected ? theme.palette.primary.main : 'transparent'}`};
    }
  }
`;

/**
 * @description Image block default editor render component.
 * @param {Props} props
 * @returns {React.Node}
 */
const PageEditor = React.forwardRef(function PageEditor(
  {
    editor: { scale = defaultPageEditor.scale } = defaultPageEditor,
    id,
    ...pageProps
  }: Props,
  ref
) {
  return (
    <PageFrame
      scale={scale}
      selected={useEditorSelector(
        useAutoCallback(({ selection }) => selection.includes(id))
      )}
    >
      <Page {...pageProps} id={id} ref={ref} />
    </PageFrame>
  );
});

export default PageEditor;

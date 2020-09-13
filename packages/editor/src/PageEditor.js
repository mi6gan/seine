// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { EditorContext, useBlocksDispatch, useBlocksBuffer } from './context';

import type { Block, BlockEditor } from '@seine/core';
import { CREATE_BLOCK, SELECT_BLOCK } from '@seine/core';
import { Page } from '@seine/content';

type Props = BlockEditor & Block;

const StyledPage = styled(Page)`
  position: relative;
  transition: ${({ theme }) =>
    theme.transitions.create(['background'], {
      duration: theme.transitions.duration.short,
      easing: 'linear',
    })}};

  &:hover {
    ${({ cursor }) => ({ cursor })}
    ${({ cursor, theme }) =>
      cursor === 'pointer' && {
        background: theme.palette.grey[200],
      }}
  }
`;

/**
 * @description Page editor
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PageEditor({ id, ...pageProps }: Props) {
  const dispatch = useBlocksDispatch();
  const buffer = useBlocksBuffer();
  const { setBuffer } = React.useContext(EditorContext);

  return (
    <StyledPage
      {...pageProps}
      cursor={buffer ? 'pointer' : 'inherit'}
      id={id}
      onClick={useAutoCallback(() => {
        if (buffer) {
          dispatch({ type: CREATE_BLOCK, id, block: buffer });
          setBuffer(null);
          dispatch({ type: SELECT_BLOCK, id: buffer.id });
        }
      })}
    />
  );
}

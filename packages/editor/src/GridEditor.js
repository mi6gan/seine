// @flow
import * as React from 'react';
import { BlockActions } from '@seine/ui';
import { Grid } from '@seine/content';
import type { ChartProps } from '@seine/charts';
import type { BlockEditor } from '@seine/core';
import styled from 'styled-components/macro';

type Props = (ChartProps & BlockEditor) & {};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

/**
 * @description Grid editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export function GridEditor({
  addButtonRenderMap,
  dispatch,
  selection,
  id,
  ...gridProps
}: Props) {
  return (
    <Container>
      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        id={id}
        selection={selection}
      />
      <Grid {...gridProps} />
    </Container>
  );
}

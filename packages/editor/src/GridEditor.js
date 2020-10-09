// @flow
import * as React from 'react';
import { BlockActions } from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import styled from 'styled-components/macro';

import { Grid } from '@seine/content';
import type { BlockEditor } from '@seine/core';

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
      {!!gridProps?.children?.props?.children?.every(
        ({ id }) => !selection.includes(id)
      ) && (
        <BlockActions
          addButtonRenderMap={addButtonRenderMap}
          dispatch={dispatch}
          id={id}
          selection={selection}
        />
      )}
      <Grid {...gridProps} />
    </Container>
  );
}

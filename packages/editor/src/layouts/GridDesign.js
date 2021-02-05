// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { SidebarGroup, SidebarInput, SidebarLabel, SidebarSelect } from '../ui';
import { useBlocksDispatch } from '../blocks';
import ConstraintInput from '../ui/ConstraintInput';

import useSelectedLayoutItems from './useSelectedLayoutItems';

import { Box } from '@seine/styles';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';

const MAX_GAP = 19;

type Props = {
  inputAs?: React.ComponentType,
};

/**
 * @description Grid design.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function GridDesign({
  inputAs: Input = SidebarInput,
  selectAs: Select = SidebarSelect,
}: Props) {
  const dispatch = useBlocksDispatch();
  const {
    layout: {
      id,
      format: { columnGap, rowGap, columnSize },
    },
  } = useSelectedLayoutItems();

  return (
    <>
      <SidebarGroup>
        <SidebarLabel>Spacing</SidebarLabel>

        <Box display={'flex'} width={1}>
          <Box width={1 / 2}>
            <SidebarLabel mr={1}>x:</SidebarLabel>
            <Input
              value={columnGap}
              name={'column-gap'}
              onChange={useAutoCallback(({ currentTarget }) => {
                dispatch({
                  type: UPDATE_BLOCK_FORMAT,
                  id,
                  format: {
                    columnGap: Math.min(+currentTarget.value, MAX_GAP),
                  },
                });
              })}
              type={'number'}
              inputProps={{ min: 0, max: MAX_GAP }}
            />
          </Box>

          <Box width={1 / 2}>
            <SidebarLabel mr={1}>y:</SidebarLabel>
            <Input
              value={rowGap}
              name={'row-gap'}
              onChange={useAutoCallback(({ currentTarget }) => {
                dispatch({
                  type: UPDATE_BLOCK_FORMAT,
                  id,
                  format: { rowGap: Math.min(+currentTarget.value, MAX_GAP) },
                });
              })}
              type={'number'}
              inputProps={{ min: 0, max: MAX_GAP }}
            />
          </Box>
        </Box>
      </SidebarGroup>

      <SidebarGroup mb={0} as={'form'}>
        <SidebarLabel mr={1}>Column limit</SidebarLabel>
        <ConstraintInput
          id={id}
          inputAs={Input}
          inputProps={{ placeholder: 'width', min: 0 }}
          selectAs={Select}
          name={'columnSize'}
          units={['ch', 'fr', 'px', '%']}
          value={columnSize}
        />
      </SidebarGroup>
    </>
  );
}

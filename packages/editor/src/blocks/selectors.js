// @flow
import type { State } from '@seine/core';
import { blockTypes } from '@seine/core';

export const allBlocksSelector = (state: State) => state.blocks;
export const rootBlocksSelector = (state: State) =>
  state.blocks.filter(({ parent_id = null }) => parent_id === null);
export const deviceSelector = (state: State) => state.device;
export const scaleSelector = (state: State) => state.device;
export const pageSelector = (state: State) =>
  state.blocks.find(({ type }) => type === blockTypes.PAGE);

export const selectionSelector = (state: State) => state.selection;

export const selectionBlocksSelector = (state: State, blockPredicate = null) =>
  state.blocks.filter(
    (block) =>
      state.selection.includes(block.id) &&
      (blockPredicate === null || blockPredicate(block))
  );

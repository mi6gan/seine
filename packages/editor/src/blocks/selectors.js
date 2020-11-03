// @flow
import type { State } from '@seine/core';
import { blockTypes } from '@seine/core';

export const allBlocksSelector = (state: State) => state.blocks;
export const rootBlocksSelector = (state: State) =>
  state.blocks.filter(({ parent_id = null }) => parent_id === null);
export const selectionSelector = (state: State) => state.selection;
export const deviceSelector = (state: State) => state.device;
export const scaleSelector = (state: State) => state.device;
export const pageSelector = (state: State) =>
  state.blocks.find(({ type }) => type === blockTypes.PAGE);

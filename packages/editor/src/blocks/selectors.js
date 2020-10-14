// @flow
export const allBlocksSelector = (state) => state.blocks;
export const rootBlocksSelector = (state) =>
  state.blocks.filter(({ parent_id = null }) => parent_id === null);
export const selectionSelector = (state) => state.selection;
export const deviceSelector = (state) => state.device;

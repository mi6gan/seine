// @flow
import type { BlocksAction, BlocksState } from './reduceBlocks';
import type { ElementsAction, ElementsState } from './reduceElements';

export * from './reduceBlocks';
export * from './reduceElements';
export { default as createBlocksAction } from './createBlocksAction';

export type State = BlocksState | ElementsState;
export type Action = BlocksAction | ElementsAction;

// @flow
import uuid from 'uuid/v4';

import type {
  Block,
  BlockBody,
  BlockFormat,
  BlockId,
  BlockType,
  ChartType,
  LayoutType,
  ScreenDevice,
} from '../types';
import {
  blockTypes,
  chartTypes,
  defaultBarChartFormat,
  defaultBlockFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultFlexFormat,
  defaultGridFormat,
  defaultImageFormat,
  defaultLayoutFormat,
  defaultLineChartFormat,
  defaultPageFormat,
  defaultPieChartFormat,
  defaultRichTextFormat,
  defaultTableFormat,
  layoutTypes,
} from '../types';

type Blocks = $ReadOnlyArray<Block>;
type BlocksTree = Block & {
  children: BlocksTree[],
};

/**
 * @description Create clone of a block.
 * @param {Block} block
 * @returns {Block}
 */
export function cloneBlock(block: Block): Block {
  return { ...block, id: uuid() };
}

/**
 * @description Get all block ancestors.
 * @param {BlockId} id
 * @param {Blocks[]} blocks
 * @returns {Blocks[]}
 */
export function filterBlockAncestors(id: BlockId, blocks: Block[]): Block {
  return blocks.reduce(
    (acc, block, index) =>
      block['parent_id'] === id
        ? [...acc, ...filterBlockAncestors(block.id, blocks.slice(index))]
        : block.id === id
        ? [...acc, block]
        : acc,
    []
  );
}

/**
 * @description  Return true if block is a container (may have children blocks).
 * @param {Block} block
 * @returns {boolean}
 */
export function isBlockContainer(block: Block) {
  return block.type === blockTypes.PAGE || block.type === blockTypes.LAYOUT;
}

/**
 * @description  Return default block format.
 * @param {BlockFormat} type
 * @param {ChartType | LayoutType} kind
 * @returns {BlockFormat}
 */
export function getDefaultBlockFormat(
  type: BlockFormat,
  kind?: ChartType | LayoutType
) {
  switch (type) {
    case blockTypes.CHART: {
      switch (kind) {
        case chartTypes.COLUMN:
          return defaultColumnChartFormat;
        case chartTypes.BAR:
          return defaultBarChartFormat;
        case chartTypes.PIE:
          return defaultPieChartFormat;
        case chartTypes.LINE:
          return defaultLineChartFormat;
        default:
          return defaultChartFormat;
      }
    }

    case blockTypes.IMAGE:
      return defaultImageFormat;

    case blockTypes.LAYOUT: {
      switch (kind) {
        case layoutTypes.FLEX:
          return defaultFlexFormat;
        case layoutTypes.GRID:
          return defaultGridFormat;
        default:
          return defaultLayoutFormat;
      }
    }

    case blockTypes.PAGE:
      return defaultPageFormat;

    case blockTypes.RICH_TEXT:
      return defaultRichTextFormat;

    case blockTypes.TABLE:
      return defaultTableFormat;

    default:
      return defaultBlockFormat;
  }
}

/**
 * @description Return normalized block format.
 * @param {Block} block
 * @param {?ScreenDevice} device
 * @returns {BlockFormat}
 */
export function getBlockFormat(block: Block, device: ?ScreenDevice = 'any') {
  const { type, format } = block;
  return {
    ...getDefaultBlockFormat(type, format),
    ...format,
    ...(device !== 'any' && format && format[device]),
  };
}

/**
 * @description  Return normalized block.
 * @param {Block} block
 * @param {?ScreenDevice} device
 * @returns {BlockFormat}
 */
export function normalizeBlock(block: Block, device: ?ScreenDevice = 'any') {
  return {
    ...block,
    format: getBlockFormat(block, device),
  };
}

/**
 * @description Create a block of the parent.
 * @param {BlockType} type
 * @param {?BlockBody} body
 * @param {?BlockFormat} format
 * @param {?BlockId} parent_id
 * @returns {Block}
 */
export function createBlock(
  type: BlockType,
  body: ?BlockBody = null,
  format: ?BlockFormat = null,
  parent_id: ?BlockId = null
): Block {
  return normalizeBlock({
    id: uuid(),
    type,
    body,
    format,
    parent_id,
  });
}

/**
 * @description Create blocks from tree.
 * @param {Block} parent
 * @param {BlocksTree[]} tree
 * @returns {Block[]}
 */
export function createBlocksFromTree(parent, tree: BlocksTree[]): Blocks[] {
  return [
    parent,
    ...tree.reduce((acc, { children, body, format, type }) => {
      const block = createBlock(type, body, format, parent.id);
      return [
        ...acc,
        ...(children ? createBlocksFromTree(block, children) : [block]),
      ];
    }, []),
  ];
}

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
  blockTypes_v0_3,
  chartTypes,
  defaultBarChartFormat,
  defaultBlockFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultEllipseShapeFormat,
  defaultFlexFormat,
  defaultGridFormat,
  defaultImageFormat,
  defaultItemFormat,
  defaultLayoutFormat,
  defaultLineChartFormat,
  defaultPageFormat,
  defaultPathShapeFormat,
  defaultPieChartFormat,
  defaultRectShapeFormat,
  defaultRichTextFormat,
  defaultShapeFormat,
  defaultTableFormat,
  layoutTypes,
  shapeTypes,
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
 * @description  Return true if block is a layout.
 * @param {Block} block
 * @returns {boolean}
 */
export function isBlockLayout(block: Block) {
  return (
    block.type === blockTypes.PAGE ||
    block.type === blockTypes.LAYOUT ||
    block.type === blockTypes_v0_3.PAGE ||
    block.type === blockTypes_v0_3.LAYOUT
  );
}

/**
 * @description  Return true if block is a container (may have children blocks).
 * @param {Block} block
 * @returns {boolean}
 */
export function isBlockContainer(block: Block) {
  return (
    isBlockLayout(block) ||
    (block.type === blockTypes.SHAPE &&
      block.format &&
      (block.format['kind'] === shapeTypes.ROOT ||
        block.format['kind'] === shapeTypes.GROUP))
  );
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

    case blockTypes.SHAPE: {
      switch (kind) {
        case shapeTypes.PATH:
          return defaultPathShapeFormat;
        case shapeTypes.RECT:
          return defaultRectShapeFormat;
        case shapeTypes.ELLIPSE:
          return defaultEllipseShapeFormat;
        default:
          return defaultShapeFormat;
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
export function getBlockFormat(
  { type, format }: Block,
  device: ?ScreenDevice = 'any'
) {
  if (format && format.version === '0.3') {
    return format;
  }
  format = {
    version: defaultItemFormat.version,
    ...getDefaultBlockFormat(type, format && format.kind),
    ...format,
  };
  return {
    ...format,
    ...(device !== 'any' && format && format[device]),
  };
}

/**
 * @description Return normalized block body.
 * @param {Block} block
 * @returns {BlockFormat}
 */
export function getBlockBody({ type, body }: Block) {
  if (type === blockTypes.CHART && !('header' in body)) {
    const { elements, ...chartBody } = body;
    const groups = [
      ...elements.reduce(
        (acc, { group = 'null' }) => acc.add(group),
        new Set()
      ),
    ];
    const titles = [
      ...elements.reduce(
        (acc, { title = 'null' }) => acc.add(title),
        new Set()
      ),
    ];

    return {
      ...chartBody,
      header: groups.map((group, index) => ({
        text: group === 'null' ? '' : group,
        value: `${index}`,
      })),
      rows: Object.entries(
        [...elements]
          .sort(({ group: left }, { group: right }) =>
            left < right ? -1 : left > right ? 1 : 0
          )
          .reduce(
            (acc, { group = 'null', ...item }) => ({
              ...acc,
              [group]: acc[group] ? [...acc[group], item] : [item],
            }),
            {}
          )
      ).reduce(
        (acc, [group, items]) =>
          items.map(({ title, ...item }, index) => [
            ...(acc[index] ? acc[index] : []),
            {
              ...item,
              text: title,
              group: `${groups.indexOf(group)}`,
            },
          ]),
        []
      ),
      titles,
    };
  }
  return body;
}

/**
 * @description  Return normalized block.
 * @param {Block} block
 * @param {?ScreenDevice} device
 * @returns {BlockFormat}
 */
export function normalizeBlock(block: Block, device: ?ScreenDevice = 'any') {
  const typePrefix =
    block.format &&
    block.format.version &&
    block.format.version !== defaultItemFormat.version &&
    `v${block.format.version}/`;

  return {
    ...block,
    type:
      !typePrefix || block.type.startsWith(typePrefix)
        ? block.type
        : `${typePrefix}${block.type}`,
    body: getBlockBody(block),
    format: getBlockFormat(block, device),
  };
}

/**
 * @description Create a block of the parent.
 * @param {BlockType} type
 * @param {?BlockBody} body
 * @param {?BlockFormat} format
 * @param {?BlockId} parent_id
 * @param {?BlockId} id
 * @returns {Block}
 */
export function createBlock(
  type: BlockType,
  body: ?BlockBody = null,
  format: ?BlockFormat = null,
  parent_id: ?BlockId = null,
  id: ?BlockId = uuid()
): Block {
  return normalizeBlock({
    id,
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

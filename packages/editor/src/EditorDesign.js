// @flow
import * as React from 'react';

import RichTextDesign from './richtext/RichTextDesign';
import TableDesign from './table/TableDesign';
import LayoutDesign from './layout/LayoutDesign';
import useSelectedLayoutItems from './layout/useSelectedLayoutItems';
import { ChartDesign } from './chart';
import ItemDesign from './layout/ItemDesign';

import { blockTypes } from '@seine/core';

/**
 * @description Editor design panel.
 * @returns {React.Node}
 */
export default function EditorDesign() {
  const { layout, item } = useSelectedLayoutItems();

  return (
    <>
      {item && <ItemDesign />}
      {layout && <LayoutDesign />}
      {item && item.type === blockTypes.RICH_TEXT && <RichTextDesign />}
      {item && item.type === blockTypes.TABLE && <TableDesign />}
      {item && item.type === blockTypes.CHART && <ChartDesign />}
    </>
  );
}

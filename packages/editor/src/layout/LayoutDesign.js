// @flow
import * as React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import type { RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_LAYOUT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';

import FlexDesign from './FlexDesign';

type Props = {
  body: RichTextBody,
  format: RichTextFormat,
};

/**
 * @description Flex layout design.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LayoutDesign(props: Props) {
  const { id, dispatch, type } = props;
  return (
    <>
      <SidebarHeading>Layout</SidebarHeading>

      <SidebarSection>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={useAutoCallback((e) =>
              dispatch({
                type: UPDATE_BLOCK_LAYOUT,
                id,
                layout: e.target.value,
              })
            )}
          >
            <option value={'flex'}>Flex</option>
            <option value={'grid'}>Grid</option>
          </Select>
        </FormControl>
      </SidebarSection>

      {type === 'flex' ? <FlexDesign {...props} /> : null}
    </>
  );
}

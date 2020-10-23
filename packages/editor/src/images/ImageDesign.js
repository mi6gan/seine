// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarInput,
  SidebarSection,
  SidebarHeading,
} from '../ui';
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import { IconButton, InputAdornment } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';
import { CloudUpload } from '@seine/styles/mui-icons.macro';
import { blockTypes, UPDATE_BLOCK_BODY } from '@seine/core';

type Props = {
  onChange: (SyntheticInputEvent) => void,
};

const FileInput = styled(Box).attrs({
  as: 'input',
  type: 'file',
  position: 'absolute',
  display: 'inline-block',
  left: 0,
  top: 0,
  width: '1px',
  height: '1px',
})`
  opacity: 0;
  cursor: pointer;
`;

/**
 * @description Image design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableDesign({ onChange, ...inputProps }) {
  const dispatch = useBlocksDispatch();
  const { id, body } =
    useEditorSelector().find(({ type }) => type === blockTypes.IMAGE) || {};
  return (
    <SidebarSection>
      <SidebarHeading>Image</SidebarHeading>
      <SidebarGroup>
        <Box
          as={'form'}
          position={'relative'}
          onSubmit={useAutoCallback((event: SyntheticInputEvent) => {
            event.preventDefault();
            event.currentTarget.elements.namedItem('file').click();
          })}
        >
          <SidebarInput
            value={body.file}
            multiline
            rowsMax={4}
            width={1}
            onChange={useAutoCallback((event: SyntheticInputEvent) => {
              dispatch({
                type: UPDATE_BLOCK_BODY,
                id,
                body: { file: event.currentTarget.value },
              });
            })}
            endAdornment={
              <InputAdornment position={'end'}>
                <FileInput
                  {...inputProps}
                  name={'file'}
                  accept={'image/*'}
                  onChange={useAutoCallback((event: SyntheticInputEvent) => {
                    if (onChange) {
                      return onChange(event);
                    } else {
                      const reader = new FileReader();
                      reader.readAsDataURL(event.currentTarget.files[0]);
                      reader.onload = function() {
                        dispatch({
                          type: UPDATE_BLOCK_BODY,
                          id,
                          body: { file: reader.result.toString() },
                        });
                      };
                    }
                  })}
                />
                <IconButton color={'inherit'} type={'submit'}>
                  <CloudUpload />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </SidebarGroup>
    </SidebarSection>
  );
}

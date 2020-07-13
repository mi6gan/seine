// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import {
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
} from '@seine/core';
import { Item } from '@seine/content';
import { Box } from '@material-ui/core';

import { EditorContext, useEditorDispatch } from '../store';
import useSelectedLayoutItems from '../store/useSelectedLayoutItems';
import useEditorBuffer from '../store/useEditorBuffer';

export const StyledFrame = styled(Item)`
  transition: ${({ theme }) =>
    theme.transitions.create(['filter'], {
      duration: theme.transitions.duration.standard,
      easing: 'ease-in-out',
    })};
  &${({ selected = false }) => (selected ? '' : ':hover')}:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    z-index: 1;
    border: 1px
      ${({ selected }) =>
        selected === 'self'
          ? 'solid'
          : selected === 'child'
          ? 'dashed'
          : 'dashed'}
      ${({ theme, selected }) =>
        theme.palette.primary[selected === 'self' ? 'main' : 'light']};
    pointer-events: ${({ selected }) => (selected ? 'none' : 'all')};
    cursor: pointer;
  }
  &:not(:hover) {
    ${({ selected, item }) => !selected && item && { filter: 'opacity(0.5)' }}
  }
  &:hover {
    ${({ selected }) => !selected && { filter: 'opacity(0.5)' }}
  }
`;

const StyledInsertPlaceholder = styled(Box).attrs({
  position: 'absolute',
  bgcolor: 'grey.100',
  size: 10,
  zIndex: 2,
})`
  cursor: pointer;
  transition: ${({ theme }) =>
    theme.transitions.create(['width', 'height', 'background'], {
      duration: theme.transitions.duration.short,
      easing: 'ease-in-out',
    })};
  ${({ vertical, size }) => ({
    height: vertical ? size : '100%',
    width: vertical ? '100%' : size,
  })}
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[400]};
    ${({ vertical, size }) => ({
      height: vertical ? size * 4 : '100%',
      width: vertical ? '100%' : size * 4,
    })}
  }
`;

// eslint-disable-next-line
function InsertPlaceholder({ id, type, ...props }) {
  const dispatch = useEditorDispatch();
  const buffer = useEditorBuffer();
  const { setBuffer } = React.useContext(EditorContext);
  const createBlock = useAutoCallback(() => {
    dispatch({ type, id, block: buffer });
    setBuffer(null);
    dispatch({ type: SELECT_BLOCK, id: buffer.id });
  });
  return buffer ? (
    <StyledInsertPlaceholder
      {...props}
      {...(type === CREATE_LEFT_BLOCK || type === CREATE_TOP_BLOCK
        ? { left: 0, top: 0 }
        : { right: 0, bottom: 0 })}
      vertical={type === CREATE_TOP_BLOCK || type === CREATE_BOTTOM_BLOCK}
      onClick={createBlock}
    />
  ) : null;
}

// eslint-disable-next-line
export default React.forwardRef(function Frame(
  { children, id, ...props },
  ref
) {
  const dispatch = useEditorDispatch();
  const buffer = useEditorBuffer();
  const { layout, item } = useSelectedLayoutItems();
  const selected =
    (item && item.id === id) || (layout && layout.id === id)
      ? 'self'
      : item && item['parent_id'] === id
      ? 'child'
      : false;
  return (
    <>
      <StyledFrame
        {...props}
        ref={ref}
        id={id}
        item={!!item}
        selected={buffer ? !item : selected}
        onClick={useAutoCallback((event) => {
          if (!buffer) {
            dispatch({
              type: SELECT_BLOCK,
              id,
              ...(event.key === 'Control' && {
                modifier: selected ? 'add' : 'sub',
              }),
            });
          }
          event.stopPropagation();
        })}
      >
        <InsertPlaceholder id={id} type={CREATE_LEFT_BLOCK} />
        <InsertPlaceholder id={id} type={CREATE_TOP_BLOCK} />
        {children}
        <InsertPlaceholder id={id} type={CREATE_BOTTOM_BLOCK} />
        <InsertPlaceholder id={id} type={CREATE_RIGHT_BLOCK} />
      </StyledFrame>
    </>
  );
});

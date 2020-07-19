// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import {
  blockTypes,
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
} from '@seine/core';
import { Item } from '@seine/content';
import { Box } from '@material-ui/core';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDropDown,
  ArrowDropUp,
} from '@material-ui/icons';

import { EditorContext, useEditorDispatch } from '../store';
import useSelectedLayoutItems from '../store/useSelectedLayoutItems';
import useEditorBuffer from '../store/useEditorBuffer';

export const StyledFrame = styled(Item)`
  transition: ${({ theme }) =>
    theme.transitions.create(['filter'], {
      duration: theme.transitions.duration.short,
      easing: 'linear',
    })};
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
  }
  &${({ selected = false }) => (selected ? '' : ':hover')}:after {
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})`
  cursor: pointer;
  transition: ${({ theme }) =>
    theme.transitions.create(['width', 'height', 'background', 'margin'], {
      duration: theme.transitions.duration.short,
      easing: 'ease-in-out',
    })};
  ${({ vertical, size, left, right }) => ({
    height: vertical ? size : '100%',
    width: vertical ? '100%' : size,
    ...(!vertical && left === 0 && { marginLeft: -size / 2 }),
    ...(vertical && left === 0 && { marginTop: -size / 2 }),
    ...(!vertical && right === 0 && { marginRight: -size / 2 }),
    ...(vertical && right === 0 && { marginBottom: -size / 2 }),
  })}
  &:hover {
    z-index: 3;
    ${({ vertical, size, left, right }) => ({
      height: vertical ? size * 4 : '100%',
      width: vertical ? '100%' : size * 4,
      ...(!vertical && left === 0 && { marginLeft: -size * 2 }),
      ...(vertical && left === 0 && { marginTop: -size * 2 }),
      ...(!vertical && right === 0 && { marginRight: -size * 2 }),
      ...(vertical && right === 0 && { marginBottom: -size * 2 }),
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
  { children, id, onClick, ...props },
  ref
) {
  const dispatch = useEditorDispatch();
  const buffer = useEditorBuffer();
  const { layout, item, items } = useSelectedLayoutItems();
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
        selected={
          buffer
            ? !item
            : items.reduce((acc, item) => acc.add(item['parent_id']), new Set())
                .size === 1 && items.some((item) => item.id === id)
            ? 'self'
            : selected
        }
        onClick={useAutoCallback((event) => {
          if (!buffer) {
            dispatch({
              type: SELECT_BLOCK,
              id,
              ...(event.ctrlKey && {
                modifier: selected ? 'sub' : 'add',
              }),
            });
          }
          event.stopPropagation();
          onClick && onClick(event);
        })}
      >
        <InsertPlaceholder id={id} type={CREATE_LEFT_BLOCK}>
          <ArrowLeft />
        </InsertPlaceholder>
        {props.type === blockTypes.LAYOUT && (
          <InsertPlaceholder id={id} type={CREATE_TOP_BLOCK}>
            <ArrowDropUp />
          </InsertPlaceholder>
        )}
        {children}
        {props.type === blockTypes.LAYOUT && (
          <InsertPlaceholder id={id} type={CREATE_BOTTOM_BLOCK}>
            <ArrowDropDown />
          </InsertPlaceholder>
        )}
        <InsertPlaceholder id={id} type={CREATE_RIGHT_BLOCK}>
          <ArrowRight />
        </InsertPlaceholder>
      </StyledFrame>
    </>
  );
});

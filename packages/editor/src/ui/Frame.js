// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';
import { Box } from '@material-ui/core';
import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowLeft,
  ArrowRight,
} from '@material-ui/icons';

import {
  EditorContext,
  useBlocksDispatch,
  useBlocksBuffer,
  useBlocksSelector,
} from '../context';
import useSelectedLayoutItems from '../layout/useSelectedLayoutItems';

import { Item } from '@seine/content';
import {
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
} from '@seine/core';

const StyledFrame = styled(Item)`
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
  ${({ vertical, size, left, right, top, bottom }) => ({
    height: !vertical ? size : `calc(100% + ${size}px)`,
    width: !vertical ? `calc(100% + ${size}px)` : size,
    ...(vertical &&
      left === 0 && { marginLeft: -size / 2, marginTop: -size / 2 }),
    ...(!vertical &&
      top === 0 && { marginTop: -size / 2, marginLeft: -size / 2 }),
    ...(vertical &&
      right === 0 && { marginRight: -size / 2, marginBottom: -size / 2 }),
    ...(!vertical &&
      bottom === 0 && { marginBottom: -size / 2, marginRight: -size / 2 }),
  })}
  &:hover {
    z-index: 3;
    ${({ vertical, size, left, right, top, bottom }) => ({
      height: !vertical ? size * 4 : `calc(100% + ${size}px)`,
      width: !vertical ? `calc(100% + ${size}px)` : size * 4,
      ...(vertical &&
        left === 0 && { marginLeft: -size * 2, marginTop: -size / 2 }),
      ...(!vertical &&
        top === 0 && { marginTop: -size * 2, marginLeft: -size / 2 }),
      ...(vertical &&
        right === 0 && { marginRight: -size * 2, marginBottom: -size / 2 }),
      ...(!vertical &&
        bottom === 0 && { marginBottom: -size * 2, marginRight: -size / 2 }),
    })}
  }
`;

// eslint-disable-next-line
function InsertPlaceholder({ id, type, ...props }) {
  const dispatch = useBlocksDispatch();
  const buffer = useBlocksBuffer();
  const { setBuffer } = React.useContext(EditorContext);
  const createBlock = useAutoCallback((event) => {
    setBuffer(null);
    dispatch({ type, id, block: buffer });
    dispatch({ type: SELECT_BLOCK, id: buffer.id });
    event.preventDefault();
    event.stopPropagation();
  });
  return buffer ? (
    <StyledInsertPlaceholder
      {...props}
      {...(type === CREATE_LEFT_BLOCK || type === CREATE_TOP_BLOCK
        ? { left: 0, top: 0 }
        : { right: 0, bottom: 0 })}
      vertical={type === CREATE_LEFT_BLOCK || type === CREATE_RIGHT_BLOCK}
      onClick={createBlock}
    />
  ) : null;
}

// eslint-disable-next-line
export default function Frame({ children, id, onClick, ...props }) {
  const dispatch = useBlocksDispatch();
  const buffer = useBlocksBuffer();
  const { item, items } = useSelectedLayoutItems();
  const parent = useBlocksSelector(
    ({ blocks }) => item && blocks.find(({ id }) => item['parent_id'] === id)
  );
  const selected =
    item && item.id === id
      ? 'self'
      : (item && item['parent_id'] === id) || (parent && parent['parent_id'])
      ? 'child'
      : false;
  return (
    <StyledFrame
      {...props}
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
        onClick && onClick(event);
        event.preventDefault();
        event.stopPropagation();
      })}
    >
      <InsertPlaceholder id={id} type={CREATE_LEFT_BLOCK}>
        <ArrowLeft />
      </InsertPlaceholder>
      <InsertPlaceholder id={id} type={CREATE_TOP_BLOCK}>
        <ArrowDropUp />
      </InsertPlaceholder>
      {children}
      <InsertPlaceholder id={id} type={CREATE_BOTTOM_BLOCK}>
        <ArrowDropDown />
      </InsertPlaceholder>
      <InsertPlaceholder id={id} type={CREATE_RIGHT_BLOCK}>
        <ArrowRight />
      </InsertPlaceholder>
    </StyledFrame>
  );
}

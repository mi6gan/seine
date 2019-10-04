// @flow
import * as React from 'react';
import type { Action } from '@seine/core';
import MuiButton from '@material-ui/core/Button';

type Props = Action & React.ElementProps<HTMLButtonElement>;

/**
 * @description Declarative action button.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function ActionButton(
  {
    as: Button = MuiButton,
    className,
    children,
    dispatch,
    fullWidth = false,
    color = 'default',
    size = 'small',
    variant = 'contained',
    title,
    ...action
  }: Props,
  ref
) {
  return (
    <Button
      color={color}
      fullWidth={fullWidth}
      onClick={React.useCallback(() => dispatch(action), [dispatch, action])}
      ref={ref}
      size={size}
      title={title}
      variant={variant}
    >
      {children}
    </Button>
  );
});

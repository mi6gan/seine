// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { SvgInput } from '../ui';

import { SvgTypography } from '@seine/styles';
import { ChartValue } from '@seine/content';

type Props = {
  children?: any,
  onChange: (SyntheticInputEvent) => any,
};

const StyledTypography = styled(SvgTypography)`
  ${({ opacity }) => ({ opacity })};
  && {
    pointer-events: none;
  }
`;

const StyledInput = styled(SvgInput)`
  ${({ opacity }) => ({ opacity })};
`;

/**
 * @description Bar chart element value input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
const ChartValueInput = React.forwardRef(function ChartValueInput(
  { onChange, value, children, ...typographyProps }: Props,
  ref
) {
  const [focused, setFocused] = React.useState(false);
  children = React.Children.map(children, (child) =>
    child && child.type === ChartValue ? value : child
  );
  return (
    <>
      <StyledTypography
        {...typographyProps}
        children={children}
        opacity={focused ? 0.0 : 1.0}
        ref={ref}
      />
      <StyledInput
        {...typographyProps}
        children={children}
        opacity={focused ? 1.0 : 0.0}
        onFocus={useAutoCallback(() => setFocused(true))}
        onBlur={useAutoCallback(() => setFocused(false))}
        onChange={onChange}
        value={value}
        type={'number'}
      />
    </>
  );
});

export default ChartValueInput;

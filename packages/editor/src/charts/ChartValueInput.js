// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { SvgTypography } from '@seine/styles';
import { SvgInput } from '@seine/editor';

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
export default React.forwardRef(function ChartValueInput(
  { onChange, value, ...typographyProps }: Props,
  ref
) {
  const [focused, setFocused] = React.useState(false);
  return (
    <>
      <StyledTypography
        {...typographyProps}
        opacity={focused ? 0.0 : 1.0}
        ref={ref}
      />
      <StyledInput
        {...typographyProps}
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

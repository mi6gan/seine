// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildren } from '@seine/styles';

import InlineInput from './InlineInput';
import MultilineInput from './MultilineInput';

type Props = {
  children?: any,
  multiline: boolean,
};

/**
 * @description Svg foreign input styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
const SvgInput = React.forwardRef(function SvgInput(
  {
    children,
    value,
    onChange,
    onFocus,
    onBlur,
    type = 'text',
    multiline = false,
    ...typographyProps
  }: Props,
  ref
) {
  const text = useTypographyChildren(children);
  const { index: valueStartsAt } = text.match(/(?!\s)./) || { index: 0 };
  const { index: valueEndsAt } = text.match(/\s*(?!\s).\s/) || {
    index: text.length - 1,
  };
  return (
    <SvgTypography {...typographyProps} ref={ref}>
      {Array.from({ length: valueStartsAt - 1 }, () => ' ')}
      {multiline ? (
        <MultilineInput
          height={typographyProps.height}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      ) : (
        <InlineInput
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      )}
      {Array.from(
        { length: text.length - 1 - valueEndsAt - valueStartsAt - 1 },
        () => ' '
      )}
    </SvgTypography>
  );
});

export default SvgInput;

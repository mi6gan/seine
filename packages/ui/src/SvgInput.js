// @flow
import * as React from 'react';
import { SvgTypography, useTypographyChildren } from '@seine/styles';

import InlineInput from './InlineInput';

type Props = {
  children?: any,
};

/**
 * @description Svg foreign input styled according to root html document.
 * @param {Props} props
 * @returns {React.Node}
 */
const SvgInput = React.forwardRef(function SvgInput(
  { children, value, onChange, type = 'text', ...typographyProps }: Props,
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
      <InlineInput type={type} value={value} onChange={onChange} />
      {Array.from(
        { length: text.length - 1 - valueEndsAt - valueStartsAt - 1 },
        () => ' '
      )}
    </SvgTypography>
  );
});

export default SvgInput;

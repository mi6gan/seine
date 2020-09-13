// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

import InlineInput from './InlineInput';

import { SvgTypography, useTypographyChildren } from '@seine/styles';

// eslint-disable-next-line
const SvgInput = React.forwardRef(function SvgInput(
  { value, onChange, children, ...typographyProps }: Props,
  ref
) {
  const text = useTypographyChildren(children, '');
  const [prefix = '', suffix = ''] = text.split(value);

  const inputRef = React.useRef(null);
  const { current: input } = inputRef;

  const cursorRef = React.useRef(`${prefix}${value}`.length);
  const { current: cursor } = cursorRef;

  const selectionStart = input && input.selectionStart;
  const selectionEnd = input && input.selectionEnd;

  useAutoEffect(() => {
    if (selectionStart > cursor || selectionEnd > cursor) {
      input.selectionStart = input.selectionEnd = cursor;
    }
  });

  return (
    <SvgTypography {...typographyProps} ref={ref}>
      <InlineInput
        ref={inputRef}
        value={text}
        onInput={useAutoCallback(() => {
          cursorRef.current = input.selectionStart;
        })}
        onChange={useAutoCallback((event) =>
          onChange({
            currentTarget: {
              value: event.currentTarget.value
                .replace(prefix, '')
                .replace(suffix, ''),
            },
          })
        )}
      />
    </SvgTypography>
  );
});

export default SvgInput;

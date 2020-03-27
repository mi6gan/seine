import styled from 'styled-components/macro';

import Textarea from './Textarea';

const MultilineInput = styled(Textarea).attrs(() => ({
  color: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontFamily: 'inherit',
  lineHeight: 'inherit',
  textAlign: 'inherit',
  width: '100%',
}))`
  && {
    background: none;
    border: none;
    display: inline-block;
    margin: 0;
    padding: 0;
    resize: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  &:invalid {
    box-shadow: none;
  }
  :-moz-submit-invalid {
    box-shadow: none;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  &:focus {
    outline: none;
  }
`;

export default MultilineInput;

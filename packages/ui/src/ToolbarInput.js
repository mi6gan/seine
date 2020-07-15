// @flow
import styled, { css } from 'styled-components/macro';

const ToolbarInput = styled.input.attrs(
  ({ className = 'mui-textfield', type = 'text', transparent }) => ({
    className,
    transparent,
    type,
  })
)`
  && {
    height: 32px;
    margin: 6px 8px;
    padding: 0 8px;
    ${({ type, width = '6em' }) =>
      type === 'number' &&
      css`
        padding-right: 0;
        width: ${width};
      `};

    &::placeholder {
      font-size: 0.75em;
    }
  }
`;

export default ToolbarInput;

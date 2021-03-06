// @flow
import styled from 'styled-components/macro';

import { Box } from '@seine/styles';
import { Input } from '@seine/styles/mui-core.macro';

const SidebarInput = styled(Box).attrs(({ width = '3rem', mr = 1 }) => ({
  as: Input,
  mr,
  width,
}))`
  && {
    ${({ hidden }) => hidden && { display: 'none' }};
    ${({ theme }) => theme.typography.caption};
  }
  & input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

export default SidebarInput;

// @flow
import styled from 'styled-components/macro';

import { Typography } from '@seine/styles';

const TableTitle = styled(Typography).attrs(() => ({
  variant: 'h4',
  as: 'h4',
}))`
  margin-bottom: 0.5em;
  ${({ textAlignment }) => textAlignment && { textAlign: textAlignment }}
`;

export default TableTitle;

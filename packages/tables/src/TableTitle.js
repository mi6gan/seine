// @flow
import styled from 'styled-components/macro';
import { Typography } from '@seine/styles';

const TableTitle = styled(Typography).attrs(() => ({
  variant: 'h3',
  as: 'h3',
}))`
  margin-bottom: 0.5em;
`;

export default TableTitle;

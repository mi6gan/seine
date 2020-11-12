// @flow
import styled from 'styled-components/macro';

import { MenuItem } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';

const MenuButton = styled(Box).attrs(({ disabled }) => ({
  as: MenuItem,
  color: disabled ? 'grey.500' : 'inherit',
  width: 1,
}))``;

export default MenuButton;

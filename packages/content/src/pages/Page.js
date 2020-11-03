// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components/macro';

import { Layout } from '../layouts';

import type { PageFormat } from '@seine/core';
import { defaultPageFormat } from '@seine/core';

const Page = styled(Layout).attrs((props) => ({
  ...defaultPageFormat,
  ...props,
}))``;

export default (Page: ComponentType<PageFormat>);
